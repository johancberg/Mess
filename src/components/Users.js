import React, { useEffect, useState } from 'react'

import User from './User.js'

const Users = ({ firestore, uid }) => {
    const [chatList, setChatList] = useState([])
    const chatsDB = firestore.collection('chats')
    const usersDB = firestore.collection('users')
    
    useEffect(() => {
        const tempChats = []

        chatsDB.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const { users } = doc.data()
                if (users.some(user => user === uid)) {
                    tempChats.push(doc.data())
                }
            })
            pushChats(tempChats)
        })
        .catch(e => console.log(e))
        
        const pushChats = (chats) => {
            const tempChats = []
            chats.forEach(chat => {
                const otherChatUsers = chat.users.filter(value => value !== uid)
                otherChatUsers.forEach(docId => {
                    usersDB.doc(docId).get()
                        .then(doc => {
                            const { displayName, photoURL } = doc.data()
                            tempChats.push({
                                photoURL: photoURL,
                                displayName: displayName,
                                id: chat.id
                            })
                            setChatList(tempChats) // Move to line 40?
                        })
                })
            }
        )}
    },[uid, firestore])



    return (
        <div className="userList">
            { chatList.map(
                (chat, key) => {
                    return <User otherPhoto={chat.photoURL} otherChatName={chat.displayName} id={chat.id} key={key} />
                })
            }
        </div>
    )
}

 export default Users