import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import './styles/App.css';
import './fontawesome/css/all.css';

// Components / Routes
import SignIn from './routes/SignIn'
import ApiKey from './components/ApiKey'
import ChatRoom from './routes/ChatRoom';
import TempChatRoom from './routes/TempChatRoom';
import About from './routes/About';
import Error from './routes/Error';
import Users from './routes/Users';

import Layout from './layout';

const app = initializeApp(ApiKey());
const auth = getAuth(app);
const firestore = getFirestore(app);

export const routeData = [
  {
    path: '/',
    element: <Layout auth={auth} firestore={firestore} />,
    children: [
      { index: true, element: <App /> },
      { path: 'c', element: <ChatRoom auth={auth} firestore={firestore} />, children:
        [{ path: ':id', element: <ChatRoom auth={auth} firestore={firestore} /> }]
      },
      { path: 'cn', element: <TempChatRoom auth={auth} firestore={firestore} />, children:
        [{ path: ':id', element: <TempChatRoom auth={auth} firestore={firestore} /> }]
      },
      { path: 'about', element: <About /> },
      { path: '*', element: <Error /> }
    ]
  }
];

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      { user ? <Users firestore={firestore} uid={auth.currentUser.uid} /> : <SignIn auth={auth} firestore={firestore} /> }
    </div>
  );
}

export default App;
