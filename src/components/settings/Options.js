import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { collection, getDocs, query, where } from 'firebase/firestore';

const Options = ({auth, firestore, setChangeProfile, setChangeGeneral}) => {
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dbUsers = collection(firestore, 'users');

    useEffect(() => {
        getDocs(query(dbUsers, where('uid', '==', auth.currentUser.uid)))
            .then((snapshot) => {
                const [data] = snapshot.docs.map((doc) => doc.data());
                // Loop through the data and store
                // it in array to display
                setData(data);
            });
    }, [auth.currentUser.uid, dbUsers]);

    return (
        <>
            <button className="options" onClick={() => setMenu(!menu)}>
                <b className="username">{data?.displayName || ''}</b>
                <img src={data?.photoURL || 'https://imgflip.com/s/meme/Derp.jpg'} alt="profile"/>
            </button>
            { menu && <div className="dropdownBlocker" onClick={() => setMenu(!menu)}></div> }
            { <dialog className="dropdownMenu" open={menu} aria-modal={menu} aria-hidden={!menu}>
                <button onClick={() => {setChangeProfile(true); setMenu(!menu)}}>Profile settings</button>
                <button onClick={() => {setChangeGeneral(true); setMenu(!menu)}}>General settings</button>
                <button onClick={() => {setMenu(!menu); navigate('about')}}>About Mess</button>
                <button onClick={() => {auth.signOut(); setMenu(!menu)}}>Sign out</button>
            </dialog>
            }
        </>
    )
}

export default Options