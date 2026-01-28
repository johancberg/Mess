import React, { useEffect, useRef } from 'react';
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
import ProfileSettings from './components/settings/ProfileSettings'
import GeneralSettings from './components/settings/GeneralSettings'
import ChatRoom from './components/ChatRoom';
import About from './routes/About';
import Error from './routes/Error';
import Header from './components/Header';
import Chat from './routes/Chat';

const app = initializeApp(ApiKey());
const auth = getAuth(app);
const firestore = getFirestore(app);

export const routeData = [
  { path: '/', element: <App/> },
  { path: 'c', element: <Chat auth={auth} firestore={firestore}  />, children: 
    [{ path: ':id', element: <Chat auth={auth} firestore={firestore} /> }
    ],
  },
  { path: 'about', element: <About auth={auth} firestore={firestore} /> },
  { path: '*', element: <Error/> }
  // TODO: Create ErrorBoundary component to catch errors in routes
];

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

  const Settings = React.memo(() => {
    return (
      <>
        <ProfileSettings auth={auth} firestore={firestore} ref={profileRef} />
        <GeneralSettings ref={generalRef} />
      </>
    )});

  return (
    <div className="App">
      <Header auth={auth} firestore={firestore} profileRef={profileRef} generalRef={generalRef} />
      { user ? <Main auth={auth} firestore={firestore} /> : <SignIn auth={auth} firestore={firestore} /> }
      { auth.currentUser && <Settings /> }
    </div>
  );
}

export default App;
