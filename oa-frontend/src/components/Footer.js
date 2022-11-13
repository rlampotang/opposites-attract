import React from 'react'
import { useLocation } from 'react-router';

export default function Footer() {
    const { pathname } = useLocation();

    if (pathname === "/survey") return null;

    return (
        <div className='mt-auto p-2 flex w-full h-16 items-center justify-center bg-gray-200 text-center'>
            <p>
                (c) {new Date().getFullYear()} the founders
            </p>
        </div>
    )
}
