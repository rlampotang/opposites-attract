import clsx from 'clsx';
import React from 'react'
import { useAuth } from './Auth';

export default function Matches({ matches }) {
    const active = (matches !== null);
    const { user } = useAuth();

    return <div className='flex h-48 w-full relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md'>
        {!active && <>
            {Array(6).fill(0).map((_, i) => <img key={i} className='m-8 ml-10 rounded-full overflow-hidden shadow-md' referrerpolicy="no-referrer" src={user.photoURL} />)}
        </>}
        <div className={clsx(
            'absolute top-0 left-0 w-full h-full flex flex-col transition-all',
            {
                "bg-white bg-opacity-10 backdrop-blur-md rounded drop-shadow-lg": !active,
            }
        )} >
            <h3 className='m-8 text-4xl text-white font-bold'>
                go fill out the survey
            </h3>
        </div>
    </div>

}
