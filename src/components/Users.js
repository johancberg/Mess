import React from 'react'
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'

const Users = ({auth, firestore}) => {

    return (
        <BrowserRouter>
        <div style={{position:'relative',top:'10vh'}}>
            <h3>TESTING</h3>
            <Link to="/chatid">Chat with Bart</Link>
            <Routes>
                <Route exact path="/chatid" element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            </Routes>
        </div>
        </BrowserRouter>
    )
}

export default Users