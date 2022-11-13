import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from './Auth';
import Button from './Buttons';

export default function Title() {
    const [moved, setMoved] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const { loggedIn, openLoginPopup } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (moved && !showTitle) {
            const timeout = setTimeout(() => {
                setShowTitle(true);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [moved, showTitle]);

    return (
        <div className='w-full h-[16rem] flex flex-col relative justify-center items-center text-center' onMouseEnter={() => setMoved(true)}>
            <div className='mt-16 w-[76rem] flex relative touch-none text-[5rem]'>
                <h1 className={`text-red-300 absolute transition-all left-0 duration-500 ${moved && "left-[18rem] text-red-500 font-bold"}`}>Opposites</h1>
                <p className={`text-blue-300 absolute transition-all right-0 duration-500 ${moved && "right-[18.5rem] text-blue-500 font-bold"}`}>Attract</p>
            </div>
            <h2 className={`mt-32 transition-all ${!showTitle && "opacity-0"}`}>
                Matching the wrong people together for profit
            </h2>
            {loggedIn ? <Button className='mt-8' onClick={() => navigate("/survey")}>do the survey</Button> : <Button className='mt-8' onClick={() => openLoginPopup(true)}>
                join the revolution
            </Button>}
        </div>
    )
}
