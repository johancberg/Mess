import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ chats }) => {

    return (
        <div style={{position:'relative',top:'10vh'}}>
        {
            chats.length && chats.map(msg =>
                <Link to={`/c/${msg.id}`} key={msg.id} ><p style={{color:'white'}}>Chat with {msg.id}</p></Link>
            )
        }
        </div>
    )
}

 export default Users