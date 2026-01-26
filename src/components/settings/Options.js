import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router'
import { collection, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Dialog from '../Dialog';

const Options = ({auth, firestore, setChangeProfile, setChangeGeneral}) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dbUsers = collection(firestore, 'users');
    const dialogRef = useRef();

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
            <button className="options" onClick={() => dialogRef.current.toggle()}>
                <b className="username">{data?.displayName || ''}</b>
                <img src={data?.photoURL || 'https://imgflip.com/s/meme/Derp.jpg'} alt="profile"/>
            </button>
            <Dialog classString="dropdownMenu" ref={dialogRef}>
                <button onClick={() => {setChangeProfile(true); dialogRef.current.toggle()}}>Profile settings</button>
                <button onClick={() => {setChangeGeneral(true); dialogRef.current.toggle()}}>General settings</button>
                <button onClick={() => {dialogRef.current.toggle(); navigate('about')}}>About Mess</button>
                <button onClick={() => {signOut(auth); dialogRef.current.toggle()}}>Sign out</button>
            </Dialog>
        </>
    )
}

export default Options