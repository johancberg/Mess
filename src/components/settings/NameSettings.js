import React, { useState } from 'react'

const NameSettings = ({auth, firestore, setChangeName}) => {
    const [nameInput, setNameinput] = useState(auth.currentUser.displayName || '')
  
    
    const changeName = (e) => {
      e.preventDefault()
      const ref = firestore.collection('messages')
      
      ref.where('uid', '==', auth.currentUser.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            ref.doc(doc.id).update({displayName: nameInput})
            auth.currentUser.updateProfile({displayName: nameInput})
        });
      }).catch(e => console.log(e))
      setChangeName(false)
    }

    return (
        <div className="option-photo" onSubmit={changeName}>
            <form className="settings">
                <div><label>Name</label>
                <input type="text" onChange={e => setNameinput(e.target.value)} value={nameInput}></input></div>
                <div className="save-button"><button onClick={changeName}>Save</button></div>
            </form>
        </div>
    )
}

export default NameSettings