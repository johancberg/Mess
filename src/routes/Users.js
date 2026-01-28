import React, { useEffect, useState } from 'react'

import User from '../components/User.js'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';

const Users = ({ firestore, uid }) => {
    const [chatList, setChatList] = useState([])
    const [othersList, setOthersList] = useState([])
    const chatsDB = collection(firestore, 'chats')
    const usersDB = collection(firestore, 'users')
    const usersDBfilter = query(usersDB, orderBy('lastLoggedIn'), limit(30))

    useEffect(() => {
        const tempList = []
        const pushUsers = async () => {
            await getDocs(chatsDB)
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
    
        const pushChatLists = (chats) => {
            for (const chat of chats) {
                const otherChatUsers = chat.users.filter(value => value !== uid)
                otherChatUsers.forEach(async docId => {
                    await getDoc(doc(usersDB, docId))
                        .then(doc => {
                            const { displayName, photoURL } = doc.data()
                            setChatList(prevChats => [...prevChats, { photoURL, displayName, id: chat.id }])
                        })
                })
            }
        }

        const pushOtherUsers = async (chats) => {
            const otherChatUsers = []
            for (const chat of chats) {
                otherChatUsers.push(chat.users.filter(value => value !== uid).toString())
            }

            await getDocs(usersDBfilter)
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (!otherChatUsers.includes(doc.id) && doc.id !== uid) {
                            const { displayName, photoURL } = doc.data()
                            setOthersList(prevUsers => [...prevUsers, { photoURL, displayName, id: doc.id }])
                        }
                    })
                })
        }

        const updateLastLoggedIn = async () => {
            const res = await getDoc(doc(usersDB, uid))
            if (res.exists()) {
                const { lastLoggedIn } = res.data()
                const currentDate = new Date()
                const lastLoggedInMinutes = Math.round(lastLoggedIn.toMillis() / 1000 / 100)
                const currentDateMinutes = Math.round(currentDate.getTime() / 1000 / 100)

                if (lastLoggedInMinutes !== currentDateMinutes) {
                    await updateDoc(doc(usersDB, uid), { lastLoggedIn: serverTimestamp() })
                        .catch(e => console.error(e))
                }
            }
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