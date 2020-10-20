import { auth } from 'firebase';
import React, {useState} from 'react';

// Components
import ChatMessage from './ChatMessage';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = ({ auth, messageStore }) => {
    
    const messageRef = messageStore.collection('messages'); 
    const query = messageRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField : 'id'});
    
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
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
        <div>
            <h4>You're logged in!</h4>
            { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
        { (auth.currentUser) ? <button onClick={() => auth.signOut()}>Sign out</button> : ''}
        </>
    )
}

export default ChatRoom;