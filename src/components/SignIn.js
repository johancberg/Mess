import React from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const SignIn = ({ auth }) => {
    let registerPage = true;
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <div className="main-page">
                <form onSubmit="registerAccount">
                    <h2>{ registerPage ? 'Register' : 'Login' }</h2>
                    <div><label>E-mail </label><input type="name"></input></div>
                    <div><label>Password </label><input type="password"></input></div>
                </form>
            <div>
                <button className="sign-in" onClick={ signInWithGoogle }>{ registerPage ? 'Register' : 'Login' }</button>
                <button className="sign-in google" onClick={ signInWithGoogle }><i className="fab fa-google"></i> Sign In</button>
            </div>
            {registerPage ?
                <div className="switch-login">Already have an account? <span onClick={registerPage=false}>Login here!</span></div>
            :
                <div className="switch-login">Don't have an account? <span onClick={registerPage=true}>Register here!</span></div>
            }
        </div>
    )
}

export default SignIn;