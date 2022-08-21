import React, { useEffect, useState } from 'react'

import User from './User.js'

const Users = ({ firestore, uid }) => {
    const [chatList, setChatList] = useState([])
    const [otherChatNames, setOtherChatNames] = useState([])
    const [otherPhotos, setOtherPhotos] = useState([])

    useEffect(() => {    
        const getChats = async () => {
            await firestore.collection('chats').get()
            .then(querySnapshot => {
                const chats = []
                querySnapshot.forEach(doc => {
                    const { users } = doc.data()
                    if (users.some(user => user === uid)) {
                        chats.push(doc.data())
                    }
                })
                return setChatList(chats)
            })
            .catch(e => console.log(e))
        }
        getChats()
    }, [uid, firestore])


    useEffect(() => {
        const users = []
        const photos = []
        chatList.forEach(chat => {
            const otherChatUsers = chat.users.filter(value => value !== uid)
            otherChatUsers.forEach(async (docId) => {
                await firestore.collection('users').doc(docId).get()
                .then(doc => {
                    const { displayName, photoURL } = doc.data()
                    users.push(displayName)
                    photos.push(photoURL || 'https://imgflip.com/s/meme/Derp.jpg')
                })
            })
        })
        setOtherChatNames(users)
        setOtherPhotos(photos)
        
    }, [chatList, uid, firestore])

    return (
        <div className="userList">
        {
            chatList.map((chat, key) =>
                <User otherPhoto={otherPhotos[key]} otherChatName={otherChatNames[key]} id={chat.id} key={chat.id} />
            )
        }
        </div>
    )
}

 export default Users