import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import ChatRoom from './ChatRoom'
import Users from './Users'

const Main = ({auth, firestore}) => {
    const [chatList, setChatList] = useState([]);

    /*
    const chatRef = firestore.collection('chats');
    const query = chatRef.orderBy('recentPost').limit(25);
    const [chats] = useCollectionData(query, {idField : 'id'});
    */
    
    const chatsRef = firestore.collection('chats')
    chatsRef.get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            setChatList([chatsRef.doc(doc.id)])
        })
    })
    .catch(e => console.log(e))
    /*
    const chatRef = firestore.collection('chats');
    chatRef.doc().get()
        .then(querySnapshot => {
            console.log(querySnapshot)
            setChatList(querySnapshot, ...chatList)
        })
        .catch(e => console.log(e))
    */
    return (
            <Routes>
                <Route exact path="/" element={<Users chats={chatList} />} ></Route>
                {
                    chatList.map(chat => <Route exact path={`c/${chat.id}`} element={<ChatRoom auth={auth} firestore={firestore} key={chat.id} />} ></Route>)
                }
                
            </Routes>
    )
}

export default Main