import React, {useState} from 'react'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore' 
import { updateProfile } from "firebase/auth";
import Dialog from '../Dialog'

const ProfileSettings = ({auth, firestore, ref}) => {
    const [URLinput, setURLinput] = useState(auth.currentUser.photoURL || '')
    // TODO: nameInput default seems to be taken from firebase auth and not database
    const [nameInput, setNameinput] = useState(auth.currentUser.displayName || '')
    const messageRef = collection(firestore, 'messages')
    const userRef = collection(firestore, 'users')


    // auth.currentUser.photoURL is null
  
    const changePhotoURL = async () => {
        try {
            await getDocs(query(messageRef, where('uid', '==', auth.currentUser.uid))).then(querySnapshot => {
                querySnapshot.forEach(async (msg) => {
                    await updateDoc(msg.ref, {photoURL: URLinput})
                });
            });
            await updateDoc(doc(userRef, auth.currentUser.uid), { photoURL: URLinput });
            await updateProfile(auth.currentUser, {photoURL: URLinput})
        } catch(e) {
            console.error("Error when updating photoURL: ", e);
        }
    }

    const changeName = async () => {
        try {
            await getDocs(query(messageRef, where('uid', '==', auth.currentUser.uid))).then(querySnapshot => {
                querySnapshot.forEach(async (msg) => {
                    await updateDoc(doc(messageRef, msg.id), {displayName: nameInput})
                });
            });
            await updateDoc(doc(userRef, auth.currentUser.uid), {displayName: nameInput});
            await updateProfile(auth.currentUser, {displayName: nameInput});
        } catch (e) {
            console.error("Error when updating the display name: ", e)
        }
    }

    const changeProfile = (e) => {
        e.preventDefault()
        if (auth.currentUser.photoURL !== URLinput) {
            changePhotoURL()
        }
        if (auth.currentUser.displayName !== nameInput) {
            changeName()
        }
        ref.current.close()
    }

    const deleteProfile = (e) => {
        e.preventDefault()
        auth.currentUser.delete()
    }

    return (
        <Dialog classString="option-photo" ref={ref}>
            <form className="settings" onSubmit={changeProfile}>
                <div className="option"><label>Name</label>
                <input type="text" onChange={e => setNameinput(e.target.value)} value={nameInput}></input></div>

                <div className="option"><label>Photo URL</label>
                <input type="text" onChange={e => setURLinput(e.target.value)} value={URLinput}></input></div>

                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
					<div className='warning-button'><button onClick={deleteProfile}>Delete user</button></div>
					<div className="save-button"><button onClick={changeProfile}>Save</button></div>
                </div>
            </form>
        </Dialog>
    )
}

export default ProfileSettings