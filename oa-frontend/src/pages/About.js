import React from 'react'
import { PageContainer } from './PageComponents'

function Person({ photo, name, bio, big }) {
    return <div className='text-white mx-12 my-8 flex justify-center items-center flex-col text-center max-w-md'>
        <div className={`rounded-full bg-white ${big ? "w-48 h-48 grayscale" : "w-36 h-36"} shadow-md`} >
            <img className='rounded-full w-full h-full' referrerPolicy="noreferrer" src={photo} />
        </div>
        <h2 className='mt-6 text-4xl font-bold'>{name}</h2>
        <p className='mt-3 text-lg'>{bio}</p>
    </div>
}

export default function About() {
    return (
        <div className='flex w-full flex-col items-center min-h-[calc(100vh-7rem)] bg-gradient-to-b from-orange-500 via-purple-500 to-blue-500' >
            <Person name="Adam Lehavi" bio="dead" big photo="https://media-exp1.licdn.com/dms/image/C5603AQHUT6-SEh7lwA/profile-displayphoto-shrink_400_400/0/1645397695492?e=1674086400&v=beta&t=2vyjtpWfYT4TeY5Lge3DErszaqdnZlKCT7xa8yVZZH8" />
            <div className='flex'>
                <Person name="Will Fart-hat" bio="smokey the bear hat filled with moisturizer" photo="https://media-exp1.licdn.com/dms/image/C5603AQEdHzx-ynKzmw/profile-displayphoto-shrink_800_800/0/1604691879525?e=2147483647&v=beta&t=so-zbyQEAHeOxHQ2OsbSFKr8pEADBZcAABDEyMA_-j0" />
                <Person name="Cecil Dong" bio="something about a seesaw" photo="https://media-exp1.licdn.com/dms/image/C5603AQH8luVDTPENkQ/profile-displayphoto-shrink_400_400/0/1653806608229?e=1674086400&v=beta&t=DV8jyFud7ucpDyHxHrTKIceBfdokvlyfd2av0uLDcvM" />
            </div>
            <div className='flex'>
                <Person name="Ryan Lambowang" bio="drives his lambo with his legs on the dashboard" photo="https://media-exp1.licdn.com/dms/image/C4E03AQGGikxYpPRZyw/profile-displayphoto-shrink_400_400/0/1621110558573?e=1674086400&v=beta&t=lr-Aj0mKS2QOQ1-8Ndgia3ygGrtf09rDVmcxYXA8oy8" />
                <Person name="Noah Peelin" bio="too hydrated at night" photo="https://media-exp1.licdn.com/dms/image/C5603AQGKSFC_KK7BRA/profile-displayphoto-shrink_400_400/0/1661017644738?e=1674086400&v=beta&t=FCp9gA-N4bDW7QO4jd7voVrZgBSCcBy20pgh3_oFjw4" />
            </div>
            <div className='my-8 p-8 max-w-[40rem] text-black bg-white shadow-md rounded-2xl'>
                <p>
                    <span className='font-bold'>Adam</span>, some would call him a lad… even a chum. He has left us now,  may he have the best of luck in his next life. The competition started… he chose fame and glory over friends. Those that we consider our closest friends, who love the same ideas we do, could be deserters. Fed up with the social convention to be friends with those similars to you, the founders set out on a life mission to redfeine social norms.
                </p>
            </div>
        </div>
    )
}
