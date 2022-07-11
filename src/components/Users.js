import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ chats }) => {
    console.log(chats)

    return (
        <div style={{position:'relative',top:'10vh'}}>
        {
            chats && chats.map(msg => <Link to={`c/${msg.id}`}><p style={{color:'white'}}>Chat with Bart</p></Link>)
        }
        </div>
    )
}

 export default Users