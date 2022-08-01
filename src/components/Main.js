import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'
import Users from './Users'

const Main = ({auth, firestore}) => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const chatsRef = firestore.collection('chats')
        chatsRef.get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                setChatList(chatList.push(doc.data()))
            })
        })
        .catch(e => console.log(e))
    }, [firestore])

    return (
        <Routes>
            <Route exact path="/" element={<Users chats={chatList} />} ></Route>
            {
                //chatList.length && chatList.map(chat =>
                <Route exact path="/:id" element={<ChatRoom auth={auth} firestore={firestore} />} ></Route>
                //)
            }
            
        </Routes>
    )
}

export default Main