import React, {useRef, useState, useEffect} from 'react';

// Components
import ChatMessage from './ChatMessage';
import Error from './Error';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useLocation } from 'react-router-dom';

const ChatRoom = ({ auth, firestore }) => {
    const scroll = useRef();
    const [messages, setMessages] = useState([])
    const [warning, setWarning] = useState(false)

    const searchParams = useQuery();
    const chatParam = searchParams.get("id");
    const chatRef = firestore.collection('chats').doc(chatParam);
    const messageRef = firestore.collection('messages').orderBy('createdAt').where('cid', '==', chatParam);

    const [formValue, setFormValue] = useState('');
    const [reply, setReply] = useState(false);
    

    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }

    // TODO: Solve "messageRef.set is not a function"
    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;
        messageRef.get().then(docs => docs.forEach(doc => console.log(doc.data())))
        if (reply.message) {
            await messageRef.add({
                displayName,
                text: formValue,
                replyText: reply.message.text,
                replyName: reply.message.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            }).then(() => setReply(false));
            
        } else {
            await messageRef.add({
                displayName: displayName,
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            });
        }
        await chatRef.update({ recentPost: firebase.firestore.FieldValue.serverTimestamp() })
        setFormValue('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Checks if the user should be able to read this chat
    useEffect(() => {
        firestore.collection('chats').doc(chatParam).get()
        .then(snapshot => {
            const cidQuery = snapshot.data()
            const { uid } = auth.currentUser
            if (!cidQuery.users.some(user => user === uid)) {
                setWarning(true)
            }
        })
    }, [firestore, auth.currentUser, chatParam])

    // Scrolls the chat to the bottom
    useEffect(() => {
        window.onload = scrollToBottom()
    }, [messages])

    // Gets all the chat-id-messages
    useEffect(() => {
        messageRef.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                setMessages(docs => [...docs, doc.data()])
            });
        }).catch(e => console.log(e))
    }, [chatParam])

    return (
        warning
        ?
        <Error error="403" />
        :
        <main>
            <div className="message-box">
                { messages.map((msg, index) => <ChatMessage auth={auth} key={index} message={msg} setReply={setReply} />)}
                <div ref={scroll}></div>
            </div>

            { reply.message &&
                <div className="reply-field">
                    <h3>Reply to: "{ reply.message.text }"</h3>
                    <div onClick={() => setReply(false)} className="reply-exit"><i className="fas fa-times"></i></div>
                </div>
            }
            <form className="input-message" onSubmit={ sendMessage }>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value) } placeholder={"Type something"}/>
                <button type="submit" disabled={!formValue} ><i className="fas fa-paper-plane"></i></button>
            </form>
        </main>
    )
}

export default ChatRoom;