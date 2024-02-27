import React, { useEffect, useState } from 'react'

import User from './User.js'

const Users = ({ firestore, uid }) => {
    const [chatList, setChatList] = useState([])
    const [userList, setUserList] = useState([])
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
            await chats.forEach(chat => {
                const otherChatUsers = chat.users.filter(value => value !== uid)
                otherChatUsers.forEach(docId => {
                    usersDB.doc(docId).get()
                        .then(doc => {
                            const { displayName, photoURL } = doc.data()
                            setChatList(prevChats => [...prevChats, { photoURL, displayName, id: chat.id }])
                        })
                })
            })
        }

        pushUsers()
    },[])

    return (
        <div className="userPage">
            <h2>Recent chats</h2>
            <div className="userList">
                { chatList.map((chat, key) => <User otherPhoto={chat.photoURL} otherChatName={chat.displayName} id={chat.id} key={key} />) }
            </div>
            <h2>Other users</h2>
            <div className="userList">
                { userList.map((chat, key) => <User otherPhoto={chat.photoURL} otherChatName={chat.displayName} id={chat.id} key={key} />) }
            </div>
        </div>
    )
}

 export default Users