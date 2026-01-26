import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { collection, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Options = ({auth, firestore, setChangeProfile, setChangeGeneral}) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dbUsers = collection(firestore, 'users');
    const [menu] = document.getElementsByTagName('dialog');

    const toggleMenu = () => {
        if (menu?.open === false) {
            menu.showModal();
        } else {
            menu.close();
        }
    }

    const getMenu = () => {
        return (menu?.open === true);
    }

    const onDialog = (e) => {
        if (e.target === e.currentTarget) {
            toggleMenu();
        }
    }

    useEffect(() => {
        getDoc(doc(dbUsers, auth.currentUser.uid))
            .then((snapshot) => {
                const data = snapshot.data();
                // Loop through the data and store
                // it in array to display
                setData(data);
            });
    }, [auth.currentUser.uid, dbUsers]);

    return (
        <>
            <button className="options" onClick={() => toggleMenu()}>
                <b className="username">{data?.displayName || ''}</b>
                <img src={data?.photoURL || 'https://imgflip.com/s/meme/Derp.jpg'} alt="profile"/>
            </button>
            <dialog className="dropdownMenu" open={getMenu()} aria-modal={getMenu()} aria-hidden={!getMenu()} onClick={onDialog}>
                <button onClick={() => {setChangeProfile(true); toggleMenu()}}>Profile settings</button>
                <button onClick={() => {setChangeGeneral(true); toggleMenu()}}>General settings</button>
                <button onClick={() => {toggleMenu(); navigate('about')}}>About Mess</button>
                <button onClick={() => {signOut(auth); toggleMenu()}}>Sign out</button>
            </dialog>
        </>
    )
}

export default Options