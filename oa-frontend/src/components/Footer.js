import React from 'react'

export default function Footer() {
    return (
        <div className='mt-auto p-2 flex w-full h-16 items-center justify-center bg-gray-200 text-center'>
            <p>
                (c) {new Date().getFullYear()}
            </p>
        </div>
    )
}
