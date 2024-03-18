import React, {useState, useEffect} from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useLocation, useNavigate } from 'react-router-dom';

const TempChatRoom = ({ auth, firestore }) => {
    const [chatParam, setChatParam] = useState()
    const [formValue, setFormValue] = useState('');
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(useLocation().search);
    const userId = searchParams.get('id')
    
    const generateChatParam = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const createChat = async(e) => {
        e.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;

        await firestore.collection('chats').doc(chatParam).set({
            id: chatParam,
            recentPost: firebase.firestore.FieldValue.serverTimestamp(),
            users: [ uid, userId ]
        }).then(() => {
            firestore.collection('messages').add({
                displayName: displayName,
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            });
            navigate('/c?id=' + chatParam)
        }).catch((err) => console.error(err))
    }

    // Generate chatparameter
    useEffect(() => {
        setChatParam(generateChatParam())
    }, [])

    return (
        <>
            <main className="message-temp">
                <h2>Write your first message below</h2>
            </main>

            <form className="input-message" onSubmit={ createChat }>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value) } placeholder={"Type something"}/>
                <button type="submit" disabled={!formValue} ><i className="fas fa-paper-plane"></i></button>
            </form>
        </>
    )
}

export default TempChatRoom;