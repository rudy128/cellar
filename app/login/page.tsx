import LoginForm from '@/components/LoginForm'
import NavBar from '@/components/NavBar'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full'>
        <NavBar />
        <div className='min-h-[47.5dvw] w-full place-content-center'>
            <LoginForm />
        </div>
    </div>
  )
}

export default page