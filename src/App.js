import React from 'react';
import './App.css';

// Components
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCD0fNVJy2z0uOj48LkRkbRjYrj9nVmTzw",
  authDomain: "mess-3ng3r.firebaseapp.com",
  databaseURL: "https://mess-3ng3r.firebaseio.com",
  projectId: "mess-3ng3r",
  storageBucket: "mess-3ng3r.appspot.com",
  messagingSenderId: "48326566726",
  appId: "1:48326566726:web:207dea2f65711eb639fb47"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h4>This is my Firebase app</h4>
        <h1>Mess</h1>
        {user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}
      </header>
    </div>
  );
}

export default App;
