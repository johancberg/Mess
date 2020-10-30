import React, {useState} from 'react'

const PhotoSettings = ({auth, firestore, setChangePhoto}) => {
    const [URLinput, setURLinput] = useState(auth.currentUser.photoURL || '')
    // auth.currentUser.photoURL is null
  
    const changePhotoURL = (e) => {
      e.preventDefault()
      const ref = firestore.collection('messages')
      
      ref.where('uid', '==', auth.currentUser.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            ref.doc(doc.id).update({photoURL: URLinput})
            auth.currentUser.updateProfile({photoURL: URLinput})
        });
      }).catch(e => console.log(e))
      setChangePhoto(false)
    }

    return (
        <div className="option-photo" onSubmit={changePhotoURL}>
            <form className="settings">
                <div><label>Photo URL</label>
                <input type="text" onChange={e => setURLinput(e.target.value)} value={URLinput}></input></div>
                <div className="save-button"><button onClick={changePhotoURL}>Save</button></div>
            </form>
        </div>
    )
}

export default PhotoSettings