import React, { useEffect, useState } from 'react'

import User from './User.js'
import firebase from 'firebase/app';

const Users = ({ firestore, uid }) => {
    const [chatList, setChatList] = useState([])
    const [othersList, setOthersList] = useState([])
    const chatsDB = firestore.collection('chats')
    const usersDB = firestore.collection('users')
    const usersDBfilter = usersDB.orderBy('lastLoggedIn').limit(30)
    
    useEffect(() => {
        const tempList = []
        const pushUsers = async () => {
            await chatsDB.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const { users } = doc.data()
                    if (users.some(user => user === uid)) {
                        tempList.push(doc.data())
                    }
                })
                pushChatLists(tempList)
                pushOtherUsers(tempList)
            })
        }
    
        const pushChatLists = async (chats) => {
            await chats.forEach(chat => {
                const otherChatUsers = chat.users.filter(value => value !== uid)
                otherChatUsers.forEach(docId => {
                    usersDB.doc(docId).get()
                        .then(doc => {
                            const { displayName, photoURL } = doc.data()
                            setChatList(prevChats => [...prevChats, { photoURL, displayName, id: chat.id }])
                        })
                })
            })
        }

        const pushOtherUsers = async (chats) => {
            const otherChatUsers = []
            await chats.forEach(chat => {
                otherChatUsers.push(chat.users.filter(value => value !== uid).toString())
            })

            await usersDBfilter.get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (!otherChatUsers.includes(doc.id) && doc.id !== uid) {
                            const { displayName, photoURL } = doc.data()
                            setOthersList(prevUsers => [...prevUsers, { photoURL, displayName, id: doc.id }])
                        }
                    })
                })
        }
        
        const updateLastLoggedIn = () => {
            usersDB.doc(uid).get()
            .then((doc) => {
                const { lastLoggedIn } = doc.data()
                const currentDate = new Date()
                const lastLoggedInMinutes = Math.round(lastLoggedIn.toMillis() / 1000 / 100)
                const currentDateMinutes = Math.round(currentDate.getTime() / 1000 / 100)

                if (lastLoggedInMinutes !== currentDateMinutes) {
                    usersDB.doc(uid).update({lastLoggedIn: firebase.firestore.FieldValue.serverTimestamp()})
                    .catch(e => console.error(e))
                }
            }).catch(e => console.error(e))
        }

        pushUsers()
        updateLastLoggedIn()
    },[])

    return (
        <main className="userPage">
            { 0 < chatList.length &&
                <>
                <h2>Recent chats</h2>
                <div className="userList">
                    { chatList.map((chat, key) => <User otherPhoto={chat.photoURL} otherChatName={chat.displayName} id={chat.id} key={key} newContact={false} />) }
                </div>
                </>
            }
            <h2>Other users</h2>
            <div className="userList">
                { othersList.map((chat, key) => <User otherPhoto={chat.photoURL} otherChatName={chat.displayName} id={chat.id} key={key} newContact={true} />) }
            </div>
        </main>
    )
}

 export default Users