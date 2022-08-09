import React, {useRef, useState, useEffect} from 'react';

// Components
import ChatMessage from './ChatMessage';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useNavigate, useLocation } from 'react-router-dom';

const ChatRoom = ({ auth, firestore }) => {
    const scroll = useRef();
    const messageRef = firestore.collection('messages').orderBy('createdAt');
    const [messages, setMessages] = useState([])
    const [warning, setWarning] = useState(false)

    const searchParams = useQuery();
    const chatParam = searchParams.get("id");

    const [formValue, setFormValue] = useState('');
    const [reply, setReply] = useState(false);
    const navigate = useNavigate();
    

    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, displayName } = auth.currentUser;
        if (reply.message) {
            await messageRef.add({
                displayName: displayName,
                text: formValue,
                replyText: reply.message.text,
                replyName: reply.message.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL: auth.currentUser.photoURL
            }).then(() => setReply(false));
            
        } else {
            await messageRef.add({
                displayName: displayName,
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL: auth.currentUser.photoURL
            });
        }
        setFormValue('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        firestore.collection('chats').where('cid', '==', chatParam).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const cidQuery = doc.data()
                if (cidQuery.userOne !== auth.currentUser && cidQuery.userTwo !== auth.currentUser) {
                    setWarning(true)
                }
            })
        }).catch(e => console.log(e))
    }, [auth.currentUser, navigate, firestore, chatParam])

    useEffect(() => {
        window.onload = scrollToBottom()
    }, [messages])

    useEffect(() => {
        messageRef.where('cid', '==', chatParam).get()
        .then(querySnapshot => {
            const msg = []
            querySnapshot.forEach(doc => {
                msg.push(doc.data())
            });
            setMessages(msg)
        }).catch(e => console.log(e))
    }, [chatParam, messageRef])

    return (
        warning
        ?
        <main className="message-box">
            <h1>You don't have access</h1>
        </main>
        :
        <>
            <main className="message-box">
                { messages && messages.map((msg, index) => <ChatMessage auth={auth} key={index} message={msg} setReply={setReply} />)}
                <div ref={scroll}></div>
            </main>

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
        </>
    )
}

export default ChatRoom;