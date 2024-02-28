import React, {useRef, useState, useEffect} from 'react';

// Firebase imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useLocation } from 'react-router-dom';

const TempChatRoom = ({ auth, firestore }) => {
    const [chatParam, setChatParam] = useState()
    const scroll = useRef();

    const searchParams = useQuery();
    const userParam = searchParams.get("id");
    const userRef = firestore.collection('user').doc(userParam);
    const messageRef = firestore.collection('messages').orderBy('createdAt').where('cid', '==', userParam);

    const [formValue, setFormValue] = useState('');
    const [reply, setReply] = useState(false);
    
    const generateChatParam = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    // TODO: Solve "messageRef.set is not a function"
    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;
        messageRef.get().then(docs => docs.forEach(doc => console.log(doc.data())))
        if (reply.message) {
            await messageRef.add({
                displayName,
                text: formValue,
                replyText: reply.message.text,
                replyName: reply.message.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            }).then(() => setReply(false));
            
        } else {
            await messageRef.add({
                displayName: displayName,
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                cid: chatParam,
                photoURL
            });
        }
        await userRef.update({ recentPost: firebase.firestore.FieldValue.serverTimestamp() })
        setFormValue('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Generate chatparameter
    useEffect(() => {
        setChatParam(generateChatParam())
    }, [])

    return (
        <>
            <main className="message-box">
            </main>

            <form className="input-message" onSubmit={ sendMessage }>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value) } placeholder={"Type something"}/>
                <button type="submit" disabled={!formValue} ><i className="fas fa-paper-plane"></i></button>
            </form>
        </>
    )
}

export default TempChatRoom;