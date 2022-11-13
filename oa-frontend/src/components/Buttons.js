import clsx from 'clsx';
import React from 'react';

export default function Button({
    children,
    onClick,
    className,
    disabled,
    isRed = false,
}) {
    return (
        <button
            className={clsx(
                'transition-all py-2 px-3 rounded-full text-white text-lg font-bold',
                {
                    'bg-red-500 hover:bg-red-200 hover:text-black': isRed,
                    'bg-blue-500 hover:bg-blue-200 hover:text-black': !isRed,
                },
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black',
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}