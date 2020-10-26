import React, { useState } from 'react';
import { format } from "date-fns";

// Firebase imports
import 'firebase/firestore';
import 'firebase/auth';

const ChatMessage = ({ auth, message }) => {
    const { name, text, uid, photoURL, createdAt } = message;
    const messageClass = (uid === auth.currentUser.uid ? 'sent' : 'received');
    const [toggleHide, setToggleHide] = useState(false)

    const toDateTime = (secs) => { // This runs twice per click, why?
        const t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        const year = format(t, "yyyy");
        if (year === format(Date.now(), "yyyy")){
            return format(t, "H:mm d MMM");
        } else {
            return format(t, "H:mm d MMM yyyy");
        }
    }

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="profile"/>
            <div className="message-info">
                <p onClick={ () => setToggleHide(!toggleHide) }>{text}</p>
                <h6 className={ toggleHide ? `${messageClass}` : `hide ${messageClass}` }>
                    <span>{name} </span>
                    <span>{toDateTime(createdAt.seconds)}</span>
                    </h6>
            </div>
        </div>
    )
}

export default ChatMessage;