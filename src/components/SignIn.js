import React, { useState } from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Components
import PasswordInput from './PasswordInput';

const SignIn = ({ auth }) => {
    const [ registerPage, setRegisterPage ] = useState(false)
    const [ stateEmail, setStateEmail] = useState({email: ''})
    const [ statePassword, setStatePassword] = useState({password: ''})
    const [ stateRewritePassword, setStateRewritePassword] = useState({redoPassword: ''})

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
            const redoPassword = stateRewritePassword
            if (password !== redoPassword) {
                alert('Error: The passwords do not match. Try again.')
            } else if (password.length < 6) {
                alert('Error: The password has to be 6 characters or longer.')
            } else {
                auth.createUserWithEmailAndPassword(email, password)
                .catch(error => alert(error))
            }
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
                    <div><label>E-mail </label>
                        <input type="email" onKeyPress onChange={e => setStateEmail(e.target.value)}></input>
                    </div>
                    <PasswordInput label={'Password'} stateType={setStatePassword} />
                    { registerPage ?
                    <PasswordInput label={'Rewrite Password'} stateType={setStateRewritePassword} />
                    : ''}
                </form>
            <div className="login-buttons">
                <button className="sign-in" onClick={ signInWithPassword }>{ registerPage ? 'Register' : 'Login' }</button>
                <button className="sign-in google" onClick={ signInWithGoogle }><i className="fab fa-google"></i> Sign In</button>
            </div>
            
            <div className="switch-login">
                {registerPage ? (
                    <p>Already have an account? <span onClick={() => {setRegisterPage(false)}}>Login here!</span></p>
                ) : (
                    <p>Don't have an account? <span onClick={() => {setRegisterPage(true)}}>Register here!</span></p>
                )}
            </div>
        </div>
    )
}

export default SignIn;