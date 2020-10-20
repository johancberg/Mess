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
        <div className="main-page">
            <h2>You're not logged in</h2>
            <button className="sign-in " onClick={ signInWithGoogle }><i class="fab fa-google"></i> Sign In</button>
        </div>
    )
}

export default SignIn;