import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = ({ chats }) => {
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        setChatList(chats)
    }, [])

    return (
        <div style={{position:'relative',top:'10vh'}}>
        {
            chatList.length && chatList.map(msg =>
                <Link to={`c/${msg.id}`} key={msg.id} ><p style={{color:'white'}}>Chat with {msg.id}</p></Link>
            )
        }
        </div>
    )
}

 export default Users