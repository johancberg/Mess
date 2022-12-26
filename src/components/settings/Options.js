import React, {useState, useEffect} from 'react'

const Options = ({auth, firestore, setChangeProfile, setChangeGeneral}) => {
    const [menu, setMenu] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        firestore.collection("users").doc(auth.currentUser.uid).get().then((snapshot) => {
            const data = snapshot.data()
            // Loop through the data and store
            // it in array to display
            setData(data);
        });
    }, [auth.currentUser.uid, firestore]);

    return (
        <>
            <div className="options" onClick={() => setMenu(!menu)}>
                <b className="username">{data?.displayName || ''}</b>
                <img src={data?.photoURL || 'https://imgflip.com/s/meme/Derp.jpg'} alt="profile"/>
            </div>
            { menu && <div className="dropdownBlocker" onClick={() => setMenu(!menu)}></div> }
            { menu && <div className="dropdownMenu">
                <button onClick={() => {setChangeProfile(true); setMenu(!menu)}}>Profile settings</button>
                <button onClick={() => {setChangeGeneral(true); setMenu(!menu)}}>General settings</button>
                <button onClick={() => {auth.signOut(); setMenu(!menu)}}>Sign out</button>
            </div> }
        </>
    )
}

export default Options