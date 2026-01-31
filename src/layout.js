import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Header from './components/Header';
import ProfileSettings from './components/settings/ProfileSettings';
import GeneralSettings from './components/settings/GeneralSettings';
import { useAuthState } from 'react-firebase-hooks/auth';

const Layout = ({ auth, firestore }) => {
  useEffect(() => {
    if (!localStorage.getItem('mess-theme')) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      const value = localStorage.getItem('mess-theme');
      document.body.setAttribute('data-theme', value === 'dark' ? 'dark' : 'light');
    }
  }, []);

  const profileRef = useRef();
  const generalRef = useRef();
  const [user] = useAuthState(auth);

  return (
    <>
      <Header auth={auth} firestore={firestore} profileRef={profileRef} generalRef={generalRef} />
      <Outlet />
      { user && (
        <>
          <ProfileSettings auth={auth} firestore={firestore} ref={profileRef} />
          <GeneralSettings ref={generalRef} />
        </>
      )}
    </>
  );
};

export default Layout;