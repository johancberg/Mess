import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ int }) => {

    return (
        <div style={{position:'relative',top:'10vh'}}>
            <Link to={`c/${int}`}><p style={{color:'white'}}>Chat with Bart</p></Link>
        </div>
    )
}

 export default Users