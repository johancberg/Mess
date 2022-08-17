import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'
import Error from './Error'
import Users from './Users'

const Main = ({auth, firestore}) => {

    return (
        <Routes>
            <Route exact path="/" element={<Users firestore={firestore} auth={auth} />} ></Route>
            <Route exact path="/c" element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            <Route path="*" element={<Error />} ></Route>
        </Routes>
    )
}

export default Main