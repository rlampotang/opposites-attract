import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { Loading } from '../pages/PageComponents';
import { useAuth } from './Auth';
import Button from './Buttons';
import { FaLock } from "react-icons/fa";

function Person({ match, ind }) {
    const [person, setPerson] = useState(null);
    const { apiGet } = useAuth();
    const getPerson = async () => {
        const res = await apiGet(`/person?uid=${match.uid}`);
        if (res.status == 200) {
            delete res.status;
            setPerson(res);
            console.log(res);
        }
    }
    useEffect(() => {
        if (match) getPerson();
    }, [match]);

    let content = <Loading />;
    if (person) {
        const { displayName, email, photoURL, surveyProgress } = person;
        content = <>
            <h3 className='top-[-0.25rem] left-[-0.25rem] p-4 absolute rounded-br-3xl bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold shadow-md text-3xl rotate-6'>
                #{ind + 1}
            </h3>
            <img className='rounded-full overflow-hidden shadow-md' referrerPolicy="no-referrer" src={photoURL} />
            <h2 className='mt-4 text-3xl font-bold'>{displayName.split(" ")[0]}</h2>

            <Button className="mb-8 mt-6" onClick={() => {
                window.open(`mailto:${email}`);
            }}>
                hit them up
            </Button>
        </>
    }
    return <div className='pt-16 flex flex-col w-64 max-h-[32rem] md:mr-6 bg-white rounded-xl text-center items-center align-middle relative overflow-hidden mb-8 md:mb-0'>
        {content}
    </div>

}

export default function Matches({ matches }) {
    const active = (matches !== null && matches.length);
    const { user } = useAuth();

    return <div className='flex w-full flex-col min-h-[10rem] relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md'>
        {active &&
            <>
                <h2 className='mt-8 ml-10 font-bold text-white text-3xl'>tada! your matches</h2>
                <div className='flex p-6 flex-col items-center md:items-start md:flex-row '>
                    {
                        matches.map((match, i) => {
                            return <Person match={match} key={i} ind={i} />
                        })
                    }
                    <p className="text-white font-bold text-3xl mt-auto mb-24 mr-[-2rem]">
                        want more people to hate?<br></br><br></br>
                        do it again!
                    </p>
                </div>
            </>}
        {!active && <>
            <div className={clsx(
                'absolute top-0 left-0 w-full h-full flex flex-col transition-all',
                {
                    "bg-white bg-opacity-20 backdrop-blur-xl rounded drop-shadow-lg": !active,
                }
            )} >
                <h3 className='m-8 text-4xl text-white font-bold flex items-center'>
                    <FaLock className='mr-3' />
                    go fill out the survey
                </h3>
            </div>
        </>}
    </div>

}
