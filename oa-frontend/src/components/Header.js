import React, { Fragment, useRef } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Link, Outlet, useLocation, useNavigate, useOutlet, useRoutes } from 'react-router-dom';
import { useAuth } from './Auth';
import Footer from './Footer';

function Item({ children, onClick, path, className = "" }) {
    const { pathname } = useLocation();
    const isActive = pathname === `/${path}`;

    return (
        <div className={`rounded-b-md overflow-hidden px-4 h-full text-2xl transition-all duration-300 flex justify-center items-center ${isActive ? "bg-blue-500 font-bold text-white" : "hover:cursor-pointer hover:bg-gray-200 hover:shadow-sm"} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

export default function Header() {
    const { loggedIn, logOut, openLoginPopup } = useAuth();
    const location = useLocation();
    const currentOutlet = useOutlet();

    const { user } = useAuth();

    const contentRef = useRef(null);
    return (
        <>
            <div className="fixed w-full h-[3.5rem] flex bg-white shadow-sm">
                <Link to="/">
                    <Item className='rounded-bl-none' path="">
                        <span>home</span>
                    </Item>
                </Link>
                <Link to="/dashboard">
                    <Item path="dashboard">
                        <span>dashboard</span>
                    </Item>
                </Link>
                <Link to="/about">
                    <Item path="about">
                        <span>about</span>
                    </Item>
                </Link>
                {!loggedIn || !user
                    ? <Item className='ml-auto rounded-br-none'
                        onClick={openLoginPopup}>
                        <span>log in</span>
                    </Item>
                    : <>
                        <img className='m-2 rounded-full overflow-hidden shadow-md ml-auto' referrerPolicy="no-referrer" src={user.photoURL} />
                        <Item className='rounded-br-none' onClick={logOut}>
                            <span>log out</span>
                        </Item>
                    </>}
            </div>
            <div className="h-[3.5rem]"></div>
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
