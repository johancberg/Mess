import React from 'react'
import { Link } from 'react-router-dom'

const User = ({id, otherChatName, otherPhoto, newContact}) => {

    const getpath = ( newContact ) => {
        return newContact ? 'cn' : 'c'
    }
    
    return (
        <Link className="userDiv" to={`/${getpath(newContact)}?id=${id}`} key={id} >
            <img src={`${otherPhoto || 'https://imgflip.com/s/meme/Derp.jpg'}`} alt={otherChatName} />
            <p className='whiteAnchor'>Chat with {otherChatName}</p>
        </Link>
    )
}

export default User