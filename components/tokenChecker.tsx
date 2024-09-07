'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const TokenChecker = () => {
    const router = useRouter()

    const tokenExpireChecker = ()=>{
    const expirationTimeStr = localStorage.getItem('expirationTime')
    if (expirationTimeStr) {
        const expirationTime = parseInt(expirationTimeStr, 10)
        console.log(expirationTime)
        if (new Date().getTime() > expirationTime) {
            console.log('hello')
            localStorage.removeItem('authToken')
            localStorage.removeItem('expirationTime')
            router.push('/login')
        }
    }
    }

    useEffect(()=>{tokenExpireChecker()})

  return (
    <></>
  )
}

export default TokenChecker