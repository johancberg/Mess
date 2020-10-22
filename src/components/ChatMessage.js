import React, { useState } from 'react';

// Firebase imports
import 'firebase/firestore';
import 'firebase/auth';

const ChatMessage = ({ auth, message }) => {
    const { name, text, uid, photoURL } = message;
    const messageClass = (uid === auth.currentUser.uid ? 'sent' : 'received');
    const [toggleHide, setToggleHide] = useState(false)

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="profile"/>
            <div className="message-info">
                <p onClick={ () => setToggleHide(!toggleHide) }>{text}</p>
                <h6 className={ toggleHide ? "" : 'hide' }>{name}</h6>
            </div>
        </div>
    )
}

export default ChatMessage;