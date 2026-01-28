import React, {useRef, useState, useEffect} from 'react';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where, serverTimestamp, updateDoc } from 'firebase/firestore';

// Components
import ChatMessage from '../components/ChatMessage';
import Error from './Error';

import { useLocation } from 'react-router-dom';

const ChatRoom = ({ auth, firestore }) => {
    const scroll = useRef();
    const [messages, setMessages] = useState([])
    const [warning, setWarning] = useState(false)

    const searchParams = useQuery();
    const chatParam = searchParams.get("id");
    const chatRef = doc(firestore, 'chats', chatParam);
    const messageRef = collection(firestore, 'messages');
    const messageQuery = query(messageRef, orderBy('createdAt'), where('cid', '==', chatParam));

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
        getDocs(messageQuery).then(docs => docs.forEach(doc => console.log(doc.data())))
        if (reply.message) {
            await addDoc(messageRef, {
                displayName,
                text: formValue,
                replyText: reply.message.text,
                replyName: reply.message.displayName,
                createdAt: serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            }).then(() => setReply(false));
            
        } else {
            await addDoc(messageRef, {
                displayName: displayName,
                text: formValue,
                createdAt: serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            });
        }
        await updateDoc(chatRef, { recentPost: serverTimestamp() })
        setFormValue('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Checks if the user should be able to read this chat
    useEffect(() => {
        getDoc(chatRef)
        .then(snapshot => {
            const cidQuery = snapshot.data()
            const { uid } = auth.currentUser
            if (!cidQuery.users.some(user => user === uid)) {
                setWarning(true)
            }
        })
    }, [chatRef])

    // Scrolls the chat to the bottom
    useEffect(() => {
        window.onload = scrollToBottom()
    }, [messages])

    // Gets all the chat-id-messages
    useEffect(() => {
        getDocs(messageQuery)
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                setMessages(docs => [...docs, doc.data()])
            });
        }).catch(e => console.log(e))
    }, [])

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