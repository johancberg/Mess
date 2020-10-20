import { auth } from 'firebase';
import React from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const ChatRoom = ({ auth }) => {
    const signOutWithGoogle = () => {
        return auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign out</button>
        )
    }

    return (
        <div>
            <h4>You're logged in!</h4>
        </div>
    )
}

export default ChatRoom;