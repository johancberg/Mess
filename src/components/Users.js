import React, { useEffect, useState } from 'react'

import User from './User.js'

const Users = ({ firestore, uid }) => {
    const [chats, setChats] = useState([])
    const [chatList, setChatList] = useState([])
    
    useEffect(() => {
        const tempChats = []

        firestore.collection('chats').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const { users } = doc.data()
                if (users.some(user => user === uid)) {
                    tempChats.push(doc.data())
                }
            })
            setChats(tempChats)
        })
        .catch(e => console.log(e))
    },[uid, firestore])

    useEffect(() => {
        const tempChats = []
        chats.forEach(chat => {
            const otherChatUsers = chat.users.filter(value => value !== uid)
            otherChatUsers.forEach(docId => {
                firestore.collection('users').doc(docId).get()
                .then(doc => {
                    const { displayName, photoURL } = doc.data()
                    tempChats.push(<User otherPhoto={photoURL} otherChatName={displayName} id={chat.id} key={chat.id} />)
                })
            })
            setChatList(tempChats)
        })
    }, [chats, uid, firestore])

    return (
        <div className="userList">
            { chatList }
        </div>
    )
}

 export default Users