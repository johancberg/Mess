import React from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'
import Users from './Users'

const Main = ({auth, firestore}) => {

    const int = 'dDUGbyYn8by65oZWuDBO'

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Users int={int} />} ></Route>
                <Route exact path={`c/${int}`} element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Main