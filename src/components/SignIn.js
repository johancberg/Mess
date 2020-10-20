import { auth } from 'firebase';
import React from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const SignIn = ({ auth }) => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <div>
            <h4>You're not logged in!</h4>
            <button onClick={ signInWithGoogle }>Sign In</button>
        </div>
    )
}

export default SignIn;