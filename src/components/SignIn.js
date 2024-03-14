import React, { useState } from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Components
import PasswordInput from './PasswordInput';
import { Link } from 'react-router-dom';

const SignIn = ({ auth, firestore }) => {
    const [ registerPage, setRegisterPage ] = useState(false)
    const [ stateName, setStateName] = useState('')
    const [ stateEmail, setStateEmail] = useState('')
    const [ statePassword, setStatePassword] = useState('')
    const [ stateRewritePassword, setStateRewritePassword] = useState('')

    // Executes when the user logs in using its Google Account
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    // Gets executed when use logs in or register using email and password
    const signInWithPassword = async (e) => {
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
                try {
                    await auth.createUserWithEmailAndPassword(email, password)
                    .then(async (userCredential) => {
                        await firestore.collection('users').doc(userCredential.user.uid).set({
                            displayName: stateName,
                            lastLoggedIn: firebase.firestore.FieldValue.serverTimestamp(),
                            photoURL: '',
                            verified: false
                        })
                    })
                }
                catch(error) { alert(error) }
            }
        } else {
            //Login
            await auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))
        }
    }

    const resetForm = (condition) => {
        setRegisterPage(condition)
        setStateEmail('')
        setStatePassword('')
        setStateRewritePassword('')
    }

    return (
        <div className="main-page">
                <form id="signin" className="signin-form">
                    <h2>{ registerPage ? 'Register' : 'Login' }</h2>
                    { registerPage &&
                    <div><label htmlFor="signin-username">User Name </label>
                        <input id="signin-username" type="text" name="username" autoComplete="username" onChange={e => setStateName(e.target.value)} value={stateName}></input>
                    </div>
                    }
                    <div><label htmlFor="signin-email">E-mail </label>
                        <input id="signin-email" type="email" name="email" autoComplete="email" onChange={e => setStateEmail(e.target.value)} value={stateEmail}></input>
                    </div>
                    <PasswordInput label={'Password'} stateType={setStatePassword} value={statePassword} passFunction={signInWithPassword}/>
                    { registerPage &&
                    <PasswordInput label={'Rewrite Password'} stateType={setStateRewritePassword} value={stateRewritePassword} passFunction={signInWithPassword}/>
                    }
                </form>
            <div className="login-buttons">
                <button className="sign-in" onClick={ signInWithPassword }>{ registerPage ? 'Register' : 'Login' }</button>
                <button className="sign-in google" onClick={ signInWithGoogle }><i className="fab fa-google"></i> Sign In</button>
            </div>
            
            <div className="switch-login">
                {registerPage ? (
                    <p>Already have an account? <span onClick={() => resetForm(false)}>Login here!</span></p>
                ) : (
                    <p>Don't have an account? <span onClick={() => resetForm(true)}>Register here!</span></p>
                )}
            </div>
            <div className="switch-login">
                <p className="bottomRight"><Link to="/about">Read about Mess</Link></p>
            </div>
        </div>
    )
}

export default SignIn;