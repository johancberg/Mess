import React, {useState} from 'react';

// Components
import ChatMessage from './ChatMessage';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = ({ auth, firestore }) => {
    
    const messageRef = firestore.collection('messages'); 
    const query = messageRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField : 'id'});
    
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });
        setFormValue('');
    }

    return (
        <>
            <main className="message-box">
                { messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
            </main>

            <form className="input-message" onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value) } placeholder={"Write something"}/>
                <button type="submit" disabled={!formValue} >Send</button>
            </form>
        </>
    )
}

export default ChatRoom;