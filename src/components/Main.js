import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'
import Users from './Users'

const Main = ({auth, firestore}) => {
    const [chatList, setChatList] = useState([]);

    const int = 'dDUGbyYn8by65oZWuDBO'

    const chatRef = firestore.collection('chats');
    chatRef.doc().get()
        .then(querySnapshot => {
            console.log(querySnapshot)
            setChatList(querySnapshot, ...chatList)
        })
        .catch(e => console.log(e))

    return (
            <Routes>
                <Route exact path="/" element={<Users chats={chatRef} />} ></Route>
                <Route exact path={`c/${int}`} element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            </Routes>
    )
}

export default Main