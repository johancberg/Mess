import React from 'react';
import './App.css';
import './fontawesome/css/all.css';

// Components
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp(ApiKey())

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  function dropdownMenu() {
    return (
      <div>
        <button onClick={() => auth.signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mess</h1>
        {user ? ( auth.currentUser ?
          <div className="options" onClick={dropdownMenu}>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        : '') : ''}
      </header>
      {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
    </div>
  );
}

export default App;
