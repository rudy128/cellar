'use client'
import React, { useEffect, useState } from 'react'

const Time = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString())
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentTime(new Date().toLocaleTimeString())
            setCurrentDate(new Date().toLocaleDateString())

            return ()=>{clearInterval(interval)};
        }, 1000);
    },[])

    return (
        <div>
            <div>{currentDate}</div>
            <div>{currentTime}</div>
        </div>
    )
}

export default Time