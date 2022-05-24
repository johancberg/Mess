import React, {useRef, useState, useEffect} from 'react';

// Components
import ChatMessage from './ChatMessage';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = ({ auth, firestore }) => {
    const scroll = useRef();
    const messageRef = firestore.collection('messages'); 
    const query = messageRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField : 'id'});
    
    const [formValue, setFormValue] = useState('');
    const [reply, setReply] = useState(false);

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
        scroll.current.scrollIntoView({behavior: 'smooth' });
    }

    useEffect(() => {
        window.onload = scrollToBottom()
    }, [messages])

    return (
        <>
            <main className="message-box">
                { messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} setReply={setReply} />)}
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