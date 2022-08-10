import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = ({ firestore }) => {
    const [chatList, setChatList] = useState([])
    const [userList, setUserList] = useState([])

    useEffect(() => {
        firestore.collection('users').get()
        .then(querySnapshot => {
            const users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data())
            })
            setUserList(users)
        })
        .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        firestore.collection('chats').get()
        .then(querySnapshot => {
            const chats = []
            querySnapshot.forEach(doc => {
                chats.push(doc.data())
            })
            setChatList(chats)
        })
        .catch(e => console.log(e))
    }, [firestore])

    return (
        <div style={{position:'relative',top:'10vh'}}>
        {
            userList && chatList.map((msg,key) =>
                <Link to={`/c?id=${msg.id}`} key={msg.id} ><p style={{color:'white'}}>Chat with {userList[key].displayName}</p></Link>
            )
        }
        </div>
    )
}

 export default Users