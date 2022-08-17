import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = ({ firestore, auth }) => {
    const [userList, setUserList] = useState([])
    const [chatList, setChatList] = useState([])
    const [otherChatNames, setOtherChatNames] = useState([])
    const usersRef = firestore.collection('users')
    const chatsRef = firestore.collection('chats')

    useEffect(() => {
        usersRef.get()
        .then(querySnapshot => {
            const users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUserList(users)
        })
        .catch(e => console.log(e))
    }, [usersRef])

    useEffect(() => {
        chatsRef.get()
        .then(querySnapshot => {
            const chats = []
            querySnapshot.forEach(doc => {
                const { users } = doc.data()
                if (users.some(user => user === auth.currentUser.uid)) {
                    chats.push(doc.data())
                }
            })
            setChatList(chats)
        })
        .catch(e => console.log(e))
    }, [])


    useEffect(() => {
        const users = []
        chatList.forEach(chat => {
            const { uid } = auth.currentUser
            const otherChatUsers = chat.users.filter(value => value !== uid)
            otherChatUsers.forEach((docId) => {
                usersRef.doc(docId).get()
                .then(doc => {
                    const { displayName } = doc.data()
                    users.push(displayName)
                })
            })
        })
        setOtherChatNames(users)
    }, [chatList])


    return (
        <div style={{position:'relative',top:'10vh'}}>
        {
            userList && chatList.map((chat, key) =>
                <Link to={`/c?id=${chat.id}`} key={chat.id} ><p style={{color:'white'}}>Chat with {otherChatNames[key]}</p></Link>
            )
        }
        </div>
    )
}

 export default Users