import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = ({ firestore }) => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const chatsRef = firestore.collection('chats')
        chatsRef.get()
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
            chatList.map(msg =>
                <Link to={`/c?id=${msg.id}`} key={msg.id} ><p style={{color:'white'}}>Chat with {msg.id}</p></Link>
            )
        }
        </div>
    )
}

 export default Users