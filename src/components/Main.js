import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'
import Users from './Users'

const Main = ({auth, firestore}) => {
    const [chatList, setChatList] = useState([]);

    const chatsRef = firestore.collection('chats')
    chatsRef.get()
    .then(querySnapshot => {
        const chats = []
        querySnapshot.forEach(doc => {
            chats.push(doc.data())
        })
        setChatList(chats)
    })
    .catch(e => console.log(e))

    return (
        <Routes>
            <Route exact path="/" element={<Users chats={chatList} />} ></Route>
            <Route exact path="/c/:id" element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
            {
                //chatList.length && chatList.map(chat =>
                //)
            }
            
        </Routes>
    )
}

export default Main