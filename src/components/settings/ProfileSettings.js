import React, {useState} from 'react'

const PhotoSettings = ({auth, firestore, setChangeProfile}) => {
    const [URLinput, setURLinput] = useState(auth.currentUser.photoURL || '')
    const [nameInput, setNameinput] = useState(auth.currentUser.displayName || '')
    const messageRef = firestore.collection('messages')
    const userRef = firestore.collection('users')
  
    
    // auth.currentUser.photoURL is null
  
    const changePhotoURL = () => {
      messageRef.where('uid', '==', auth.currentUser.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          messageRef.doc(doc.id).update({photoURL: URLinput})
            auth.currentUser.updateProfile({photoURL: URLinput})
        });
      }).catch(e => console.log(e))

      userRef.doc(auth.currentUser.uid).update({
        photoURL: URLinput
      })
    }

    const changeName = () => {
      messageRef.where('uid', '==', auth.currentUser.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          messageRef.doc(doc.id).update({displayName: nameInput})
            auth.currentUser.updateProfile({displayName: nameInput})
        });
      }).catch(e => console.log(e))

      userRef.doc(auth.currentUser.uid).update({
        displayName: nameInput
      })
    }

    const changeProfile = (e) => {
        e.preventDefault()
        if (auth.currentUser.photoURL !== URLinput) {
          changePhotoURL()
        }
        if (auth.currentUser.displayName !== nameInput) {
          changeName()
        }
        setChangeProfile(false)
    }

    const deleteProfile = (e) => {
      e.preventDefault()
      auth.currentUser.delete()
    }

    return (
        <div className="option-photo" onSubmit={changeProfile}>
            <form className="settings">
                <div className="option"><label>Name</label>
                <input type="text" onChange={e => setNameinput(e.target.value)} value={nameInput}></input></div>

                <div className="option"><label>Photo URL</label>
                <input type="text" onChange={e => setURLinput(e.target.value)} value={URLinput}></input></div>

                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <div className='warning-button'><button onClick={deleteProfile}>Delete user</button></div>
                  <div className="save-button"><button onClick={changeProfile}>Save</button></div>
                </div>
            </form>
        </div>
    )
}

export default PhotoSettings