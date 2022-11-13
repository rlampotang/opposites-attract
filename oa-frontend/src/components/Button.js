import clsx from 'clsx';
import React from 'react';

export default function Button({
    children,
    onClick,
    className,
    disabled,
}) {
    return (
        <button
            className={clsx(
                'transition-all py-1 px-2 rounded-md border-slate-400 border-2',
                'hover:bg-slate-400 hover:text-white',
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