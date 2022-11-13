import Button from './Button';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useAuth } from './Auth';

const messages = [
    "I don't use Google (seriously?)",
    "I'm not old",
    "I don't actively bring down the human race",
    "I have touched grass",
    "I don't have an email"
]

const firebaseUiConfig = {
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
};

export default function LoginPopup({
    canClose,
    enterCredentials,
    loginState,
}) {
    const { firebase } = useAuth();
    const [loginPopupOpen, setLoginPopupOpen] = loginState;

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => setLoading(false), 0);
            return () => clearTimeout(timeout);
        }
    }, [loading]);
    const [providerInd, setProviderInd] = useState(0);
    const providers = [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ].splice(0, providerInd + 1);

    if (!firebase) return null;

    return (
        <ReactModal
            isOpen={loginPopupOpen}
            closeTimeoutMS={250}
            overlayClassName="modal"
            shouldCloseOnEsc={canClose}
            shouldCloseOnOverlayClick={canClose}
            onRequestClose={() => setLoginPopupOpen(false)}
            className={clsx(
                'modalPage formModalPage',
                'p-4 rounded-xl shadow-md bg-slate-100 min-w-[24rem] flex flex-col justify-center items-center'
            )}
        >
            {canClose && (
                <button
                    className="absolute top-3 right-4"
                    onClick={() => setLoginPopupOpen(false)}
                >
                    <GrClose />
                </button>
            )}
            <h2 className="text-4xl">Log In</h2>
            {!loading && <>
                <StyledFirebaseAuth uiConfig={
                    {
                        ...firebaseUiConfig,
                        signInOptions: providers,
                    }
                } firebaseAuth={firebase.auth()} />
                {providerInd < providers.length ? (
                    <Button
                        className="mt-4"
                        onClick={() => {
                            if (providerInd < providers.length) setLoading(true);
                            setProviderInd(providerInd + 1);
                        }}
                    >
                        {messages[providerInd]}
                    </Button>
                ) : <p>for fucks sake just log in</p>}
            </>}
            <p className='mt-4'>
                By signing up, you agree to our <a>privacy policy</a>.
            </p>
            <p>Or don't.</p>
            <p>Be like that.</p>
        </ReactModal>
    );
}