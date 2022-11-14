import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../components/Auth'
import Matches from '../components/Results'
import { Loading, PageContainer, PageHeader } from './PageComponents'

const TITLE_STYLES = [
    "text-red-500",
    "text-blue-500",
]

function Box({ children, onClick }) {
    return (
        <button className='m-8 p-8 rounded-md shadow-md flex  w-fit items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white duration-300 transition-all hover:scale-110 hover:bg-gradient-to-tr hover:shadow-lg hover:cursor-pointer text-left'
            onClick={onClick}
        >
            {children}
        </button>
    )
}

function ActionItems() {
    const navigate = useNavigate();

    return <div className='flex'>
        <Box onClick={() => navigate("/survey")}>
            <h2 className='text-3xl font-bold'>take<br></br> the<br></br>survey</h2>
            <div className='ml-4 flex w-32 h-32 bg-white shadow-sm rounded-full overflow-hidden'>
                <img src='https://media-exp1.licdn.com/dms/image/C5603AQHUT6-SEh7lwA/profile-displayphoto-shrink_400_400/0/1645397695492?e=1674086400&v=beta&t=2vyjtpWfYT4TeY5Lge3DErszaqdnZlKCT7xa8yVZZH8' referrerPolicy="noreferrer" className='grayscale opacity-20' />
            </div>
        </Box>
    </div>
}

export default function Dashboard() {
    const { user, loggedIn, apiGet } = useAuth();

    const [userData, setUserData] = useState(null);
    const loadData = async () => {
        const res = await apiGet("/user/dashboard");
        if (res.status == 200) {
            delete res.status;
            setUserData(res);
        }
    }
    const matches = userData?.matches || null

    useEffect(() => {
        if (loggedIn) {
            loadData();
        }
    }, [loggedIn]);

    if (!loggedIn) {
        return <PageContainer>
            <PageHeader>
                wait a sec
            </PageHeader>
            <p className='mt-2 text-lg'>you're not signed up yet!</p>
        </PageContainer>
    }

    return (
        <PageContainer>
            <PageHeader>
                hey there, {
                    user.displayName.split(" ").map((word, ind) =>
                        <span key={word} className={`mr-4 font-bold ${TITLE_STYLES[ind % TITLE_STYLES.length]}`}>
                            {word}
                        </span>
                    )
                }<span></span>
            </PageHeader>
            {userData ? <>
                <ActionItems />
                <Matches matches={matches} />
            </>
                : <Loading />
            }
        </PageContainer >
    )
}
