import React from 'react'
import { Link } from 'react-router-dom'

const User = ({id, otherChatName, otherPhoto, newContact}) => {

    const getpath = ( newContact ) => {
        return newContact ? 'cn' : 'c'
    }
    
    return (
        <Link className="userDiv" to={`/${getpath(newContact)}?id=${id}`} key={id} >
            <img src={`${otherPhoto || 'https://imgflip.com/s/meme/Derp.jpg'}`} alt={otherChatName} />
            <h4 style={{textAlign:'center'}}>Chat with {otherChatName}</h4>
        </Link>
    )
}

export default User