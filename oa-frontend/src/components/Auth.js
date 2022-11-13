import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { internal_apiGet, internal_apiPost } from '../utils/network';
import LoginPopup from './LoginPopup';
import { useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAlWPL3m7x8qTeSBb0DBvsD_okhHH12Qw0",
    authDomain: "opposites-attract-f7fc2.firebaseapp.com",
    databaseURL: "https://opposites-attract-f7fc2-default-rtdb.firebaseio.com/",
    projectId: "opposites-attract-f7fc2",
    storageBucket: "opposites-attract-f7fc2.appspot.com",
    messagingSenderId: "15069946333",
    appId: "1:15069946333:web:c6d7bf28ddaea042991634",
    measurementId: "G-WJ1XGX8EN3"
};
firebase.initializeApp(firebaseConfig);

export const AuthContext = createContext({});

export default function Auth(props) {
    const { children } = props;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            if (user) {
                setLoginPopupOpen((old) => {
                    if (old) navigate('/dashboard');
                    return false;
                });
            }
            else {
                setToken("");
            }
        });
        return () => {
            unregisterAuthObserver();
        }
    }, []);

    const logOut = useCallback(() => {
        firebase.auth().signOut();
        navigate("/");
    }, []);

    useEffect(() => {
        if (user && !token) {
            firebase.auth().currentUser.getIdToken(true).then(setToken);
        }
    }, [user, token]);
    const apiGet = async (path, options = {}, currentToken = token) => {
        const response = await internal_apiGet(path, currentToken, options);
        return response;
    };

    const apiPost = async (path, data, options = {}) => {
        const response = await internal_apiPost(path, data, token, options);
        return response;
    };

    const [loginPopupForced, setLoginPopupForced] = useState(false);
    const openLoginPopup = (canClose) => {
        setLoginPopupForced(!canClose);
        setLoginPopupOpen(true);
    };
    const loginState = useState(false);
    const [loginPopupOpen, setLoginPopupOpen] = loginState;

    return (
        <AuthContext.Provider
            value={{
                apiGet,
                apiPost,
                openLoginPopup,
                loggedIn: Boolean(user && token),
                logOut,
                user,
                firebase,
            }}
        >
            <div className='w-screen min-h-screen relative flex flex-col'>
                <LoginPopup
                    canClose={!loginPopupForced}
                    loginState={loginState}
                />
                {children}
            </div>
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};