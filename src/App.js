import React, { useState } from 'react';
import './App.css';
import './fontawesome/css/all.css';

// Components
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'
import Options from './components/settings/Options'
import ProfileSettings from './components/settings/ProfileSettings'

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
  const [changeProfile, setChangeProfile] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mess</h1>
        { auth.currentUser && <Options auth={auth} firestore={firestore} setChangeProfile={setChangeProfile} /> }
      </header>
      { user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} firestore={firestore} /> }

      { auth.currentUser && changeProfile && <div className="dropdownBlocker" onClick={() => {setChangeProfile(false)}}></div>}

      { auth.currentUser && changeProfile &&
          <ProfileSettings auth={auth} firestore={firestore} setChangeProfile={setChangeProfile} />
      }
    </div>
  );
}

export default App;
