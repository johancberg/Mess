import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './fontawesome/css/all.css';

// Components
import Main from './components/Main'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'
import Options from './components/settings/Options'
import ProfileSettings from './components/settings/ProfileSettings'
import GeneralSettings from './components/settings/GeneralSettings'

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
  const [changeGeneral, setChangeGeneral] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('mess-theme')) {
      document.body.setAttribute('data-theme', 'dark')
    } else {
      const value = localStorage.getItem('mess-theme')
      document.body.setAttribute('data-theme', value === 'dark' ? 'dark' : 'light')
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mess</h1>
        { auth.currentUser && <Options auth={auth} firestore={firestore} setChangeProfile={setChangeProfile} setChangeGeneral={setChangeGeneral} /> }
      </header>
      { user ? <Main auth={auth} firestore={firestore} /> : <SignIn auth={auth} firestore={firestore} /> }

      { auth.currentUser && (changeProfile || changeGeneral) && <div className="dropdownBlocker" onClick={() => {setChangeProfile(false); setChangeGeneral(false);}}></div>}

      { auth.currentUser && changeProfile &&
          <ProfileSettings auth={auth} firestore={firestore} setChangeProfile={setChangeProfile} />
      }
      { auth.currentUser && changeGeneral &&
          <GeneralSettings auth={auth} firestore={firestore} setChangeGeneral={setChangeGeneral} />
      }
    </div>
  );
}

export default App;
