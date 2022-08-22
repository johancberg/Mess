import React from 'react'
import { Link } from 'react-router-dom'

const User = ({id, otherChatName, otherPhoto}) => {

    return (
        <Link className="userDiv" to={`/c?id=${id}`} key={id} >
            <img src={`${otherPhoto}`} alt={otherChatName} />
            <h4 style={{textAlign:'center'}}>Chat with {otherChatName}</h4>
        </Link>
    )
}

export default User