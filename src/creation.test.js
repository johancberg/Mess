import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import SignIn from './routes/SignIn';
import TempChatRoom from './routes/TempChatRoom';

// Firebase is mocked so no real network calls are made
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    collection: jest.fn(),
    setDoc: jest.fn(),
    addDoc: jest.fn(),
    serverTimestamp: jest.fn()
}));

jest.mock('firebase/auth', () => ({
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn()
}));

// Captures navigation done by TempChatRoom after the chat has been created
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('User creation', () => {
    let auth;
    let firestore;

    const renderSignIn = () => render(
        <MemoryRouter>
            <SignIn auth={auth} firestore={firestore} />
        </MemoryRouter>
    );

    beforeEach(() => {
        auth = {};
        firestore = {};

        // react-scripts resets mocks between tests, so return values are set here
        doc.mockImplementation((_db, ...path) => ({ path: path.join('/') }));
        serverTimestamp.mockReturnValue('SERVER_TIMESTAMP');
        setDoc.mockResolvedValue();
        createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: 'new-user-uid' } });

        jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

describe('First-time chat creation', () => {
    let auth;
    let firestore;
    const otherUserId = 'other-user-uid';

    const renderTempChatRoom = () => render(
        <MemoryRouter initialEntries={[`/cn?id=${otherUserId}`]}>
            <TempChatRoom auth={auth} firestore={firestore} />
        </MemoryRouter>
    );

    beforeEach(() => {
        auth = {
            currentUser: {
                uid: 'current-user-uid',
                displayName: 'Current User',
                photoURL: ''
            }
        };
        firestore = {
            users: [{
                displayName: "",
                lastLoggedIn: "",
                photoURL: "",
                verified: false,    
            }]
        };

        // react-scripts resets mocks between tests, so return values are set here
        doc.mockImplementation((_db, ...path) => ({ path: path.join('/') }));
        collection.mockImplementation((_db, ...path) => ({ path: path.join('/') }));
        serverTimestamp.mockReturnValue('SERVER_TIMESTAMP');
        setDoc.mockResolvedValue();
        addDoc.mockResolvedValue({ id: 'new-message-id' });
    });

    

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
