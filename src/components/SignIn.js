import React, { useState } from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const SignIn = ({ auth }) => {
    const [ registerPage, setRegisterPage ] = useState(true)
    const [ stateEmail, setStateEmail] = useState({email: ''})
    const [ statePassword, setStatePassword] = useState({password: ''})

    // Executes when the user logs in using its Google Account
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    // Gets executed when use logs in or register using email and password
    function signInWithPassword(e) {
        e.preventDefault()
        const email = stateEmail
        const password = statePassword
        if (registerPage) {
            //Register
            auth.createUserWithEmailAndPassword(email, password)
            .catch(error => alert(error))
        } else {
            //Login
            auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))
        }
    }

    return (
        <div className="main-page">
                <form className="signin-form">
                    <h2>{ registerPage ? 'Register' : 'Login' }</h2>
                    <div><label>E-mail </label><input type="email" onChange={e => setStateEmail(e.target.value)}></input></div>
                    <div><label>Password </label><input type="password" onChange={e => setStatePassword(e.target.value)}></input></div>
                </form>
            <div className="login-buttons">
                <button className="sign-in" onClick={ signInWithPassword }>{ registerPage ? 'Register' : 'Login' }</button>
                <button className="sign-in google" onClick={ signInWithGoogle }><i className="fab fa-google"></i> Sign In</button>
            </div>
            
            <div className="switch-login">
                {registerPage ? (
                    <p>Already have an account? <span onClick={() => setRegisterPage(false)}>Login here!</span></p>
                ) : (
                    <p>Don't have an account? <span onClick={() => setRegisterPage(true)}>Register here!</span></p>
                )}
            </div>
        </div>
    )
}

export default SignIn;