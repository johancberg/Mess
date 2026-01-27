import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import './styles/App.css';
import './fontawesome/css/all.css';

// Components
import Main from './components/Main'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'
import Options from './components/settings/Options'
import ProfileSettings from './components/settings/ProfileSettings'
import GeneralSettings from './components/settings/GeneralSettings'

const app = initializeApp(ApiKey());
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);
  const generalRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem('mess-theme')) {
      document.body.setAttribute('data-theme', 'dark')
    } else {
      const value = localStorage.getItem('mess-theme')
      document.body.setAttribute('data-theme', value === 'dark' ? 'dark' : 'light')
    }
  }, [])

  const Header = React.memo(() => {
    return (
      <header className="App-header">
        <Link to="/"><img className="mainLogo" src="logo.png" alt="Logo saying Mess" /></Link>
        { auth.currentUser && <Options auth={auth} firestore={firestore} profileRef={profileRef} generalRef={generalRef} /> }
      </header>
    )
  });

  const Settings = React.memo(() => {
    return (
      <>
      { <ProfileSettings auth={auth} firestore={firestore} ref={profileRef} />
      }
      { <GeneralSettings ref={generalRef} />
      }
      </>
    )});

  return (
    <div className="App">
      <Header />
      { user ? <Main auth={auth} firestore={firestore} /> : <SignIn auth={auth} firestore={firestore} /> }
      { auth.currentUser && <Settings /> }
    </div>
  );
}

export default App;
