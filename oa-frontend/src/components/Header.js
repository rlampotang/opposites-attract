import React, { Fragment, useRef } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Link, Outlet, useLocation, useOutlet, useRoutes } from 'react-router-dom';
import { useAuth } from './Auth';
import Footer from './Footer';

function Item({ children, className = "", onClick }) {
    return (
        <div className={`rounded-b-md overflow-hidden px-4 h-full text-2xl transition-all duration-300 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200 hover:shadow-sm ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

export default function Header() {
    const { loggedIn, logOut, openLoginPopup } = useAuth();
    const location = useLocation();
    const currentOutlet = useOutlet();

    const contentRef = useRef(null);
    return (
        <>
            <div className="fixed w-full h-12 flex">
                <Link to="/">
                    <Item className='rounded-bl-none'>
                        <span>Home</span>
                    </Item>
                </Link>
                <Link to="/about">
                    <Item>
                        <span>About</span>
                    </Item>
                </Link>
                {!loggedIn
                    ? <Item className='ml-auto rounded-br-none'
                        onClick={openLoginPopup}>
                        <span>Log In</span>
                    </Item>
                    : <Item className='ml-auto rounded-br-none' onClick={logOut}>
                        <span>Log Out</span>
                    </Item>}
            </div>
            <div className='h-12' />
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={location.pathname}
                    nodeRef={contentRef}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                >
                    {(state) => (
                        <div ref={contentRef}>
                            {currentOutlet}
                        </div>
                    )}
                </CSSTransition>
            </SwitchTransition>
            <Footer />
        </>
    )
}
