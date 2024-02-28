import React from 'react'
import { Route, Routes } from 'react-router-dom'

import About from './About'
import ChatRoom from './ChatRoom'
import TempChatRoom from './TempChatRoom'
import Error from './Error'
import Users from './Users'

const Main = ({auth, firestore}) => {

    return (
        <Routes>
            <Route exact path="/" element={<Users firestore={firestore} uid={auth.currentUser.uid} />} ></Route>
            <Route exact path="/c" element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            <Route exact path="/cn" element={<TempChatRoom auth={auth} firestore={firestore} />} ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="*" element={<Error />} ></Route>
        </Routes>
    )
}

export default Main