import React, {useState} from 'react'

const PhotoSettings = ({auth, firestore, setChangeProfile}) => {
    const [URLinput, setURLinput] = useState(auth.currentUser.photoURL || '')
    const [nameInput, setNameinput] = useState(auth.currentUser.displayName || '')
  
    
    // auth.currentUser.photoURL is null
  
    const changePhotoURL = () => {
      const ref = firestore.collection('messages')
      
      ref.where('uid', '==', auth.currentUser.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            ref.doc(doc.id).update({photoURL: URLinput})
            auth.currentUser.updateProfile({photoURL: URLinput})
        });
      }).catch(e => console.log(e))
      setChangeProfile(false)
    }

    const changeName = () => {
      const ref = firestore.collection('messages')
      
      ref.where('uid', '==', auth.currentUser.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            ref.doc(doc.id).update({displayName: nameInput})
            auth.currentUser.updateProfile({displayName: nameInput})
        });
      }).catch(e => console.log(e))
      setChangeProfile(false)
    }

    const changeProfile = (e) => {
        e.preventDefault()
        changePhotoURL()
        changeName()
    }

    return (
        <div className="option-photo" onSubmit={changePhotoURL}>
            <form className="settings">
                <div><label>Name</label>
                <input type="text" onChange={e => setNameinput(e.target.value)} value={nameInput}></input></div>

                <div><label>Photo URL</label>
                <input type="text" onChange={e => setURLinput(e.target.value)} value={URLinput}></input></div>
                <div className="save-button"><button onClick={changeProfile}>Save</button></div>
            </form>
        </div>
    )
}

export default PhotoSettings