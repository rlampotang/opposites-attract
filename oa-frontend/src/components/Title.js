import React, { useEffect, useRef, useState } from 'react'

export default function Title() {
    const [moved, setMoved] = useState(false);
    const [showTitle, setShowTitle] = useState(false);

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
        </div>
    )
}
