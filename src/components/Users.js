import React, { useEffect, useState } from 'react'

import User from './User.js'

const Users = ({ firestore, uid }) => {
    const [chatList, setChatList] = useState([])
    const chatsDB = firestore.collection('chats')
    const usersDB = firestore.collection('users')
    
    useEffect(() => {
        const pushUsers = async () => {
            const tempChats = []
    
            await chatsDB.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const { users } = doc.data()
                    if (users.some(user => user === uid)) {
                        tempChats.push(doc.data())
                    }
                })
                pushChatLists(tempChats)
            })
        }
    
        const pushChatLists = async (chats) => {
            const newChats = []
            await chats.forEach(chat => {
                const otherChatUsers = chat.users.filter(value => value !== uid)
                otherChatUsers.forEach(docId => {
                    usersDB.doc(docId).get()
                        .then(doc => {
                            const { displayName, photoURL } = doc.data()
                            newChats.push({
                                photoURL: photoURL,
                                displayName: displayName,
                                id: chat.id
                            })
                        })
                })
                setChatList(newChats)
            })
        }

        pushUsers()
    },[])

    return (
        <div className="userList">
            { chatList.map((chat, key) => <User otherPhoto={chat.photoURL} otherChatName={chat.displayName} id={chat.id} key={key} />) }
        </div>
    )
}

 export default Users