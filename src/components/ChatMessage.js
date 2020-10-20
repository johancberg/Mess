import React from 'react';

// Firebase imports
import 'firebase/firestore';
import 'firebase/auth';

const ChatMessage = ({ auth, message }) => {
    const {text, uid, photoURL } = message;
    const messageClass = (uid === auth.currentUser.uid ? 'sent' : 'received');

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage;