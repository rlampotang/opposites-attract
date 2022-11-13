import React from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

export function PageContainer({ children }) {
    return (
        <div className='p-8 w-full relative flex flex-col'>
            {children}
        </div>
    )
}

export function PageHeader({ children }) {
    return (
        <h1 className='text-6xl'>
            {children}
        </h1>
    )
}

export function Loading({ className = "" }) {
    return (
        <div className='flex flex-col w-full justify-center mt-16 items-center'>
            <ClimbingBoxLoader />
            <p className='text-lg'>loading...</p>
        </div>
    )
}