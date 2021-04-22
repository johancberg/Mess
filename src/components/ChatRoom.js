import React, {useRef, useState} from 'react';

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

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, displayName } = auth.currentUser;
        await messageRef.add({
            displayName: displayName,
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL: auth.currentUser.photoURL
        });
        setFormValue('');
        scroll.current.scrollIntoView({behavior: 'smooth' });
    }

    return (
        <>
            <main className="message-box">
                { messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} setReply={setReply} />)}
                <div ref={scroll}></div>
            </main>

            <div className={ reply ? "reply-message" : "hide reply-message" }>
                <h2>Function will come</h2>
                <div onClick={() => setReply(false)} className="reply-exit"><i class="fas fa-times"></i></div>
            </div>
            <form className="input-message" onSubmit={ sendMessage }>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value) } placeholder={"Type something"}/>
                <button type="submit" disabled={!formValue} ><i className="fas fa-paper-plane"></i></button>
            </form>
        </>
    )
}

export default ChatRoom;