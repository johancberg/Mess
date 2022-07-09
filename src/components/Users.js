import React from 'react'
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'

const Users = ({auth, firestore}) => {

    const int = 'dDUGbyYn8by65oZWuDBO'

    return (
        <BrowserRouter>
        <div style={{position:'relative',top:'10vh'}}>
            <h3>TESTING</h3>
            <Link to={`c/${int}`}>Chat with Bart</Link>
            <Routes>
                <Route exact path={`c/${int}`} element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            </Routes>
        </div>
        </BrowserRouter>
    )
}

export default Users