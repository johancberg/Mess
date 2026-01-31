import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Options from './settings/Options';
import { useAuthState } from 'react-firebase-hooks/auth';

  const Header = React.memo(({ auth, firestore, profileRef, generalRef }) => {

  const [user] = useAuthState(auth);
    return (
      <header className="App-header">
        <Link to="/"><img className="mainLogo" src="logo.png" alt="Logo saying Mess" /></Link>
        { user && <Options auth={auth} firestore={firestore} profileRef={profileRef} generalRef={generalRef} /> }
      </header>
    )
  });

export default Header;