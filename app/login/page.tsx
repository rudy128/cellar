import LoginForm from '@/components/LoginForm'
import NavBar from '@/components/NavBar'
import dynamic from 'next/dynamic'
import React from 'react'

const Login = dynamic(()=> import('@/components/LoginForm'),{ssr:false})

const page = () => {
  return (
    <div className='w-full h-full'>
        <NavBar />
        <div className='min-h-[47.5dvw] w-full place-content-center'>
            <Login />
        </div>
    </div>
  )
}

export default page