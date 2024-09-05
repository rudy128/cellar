'use client';
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';

const LoginForm = () => {
    const handleOnSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        console.log(e.currentTarget.username, e.currentTarget.password)
    }
  return (
    <form onChange={handleOnSubmit} className='flex flex-col justify-center space-y-12 backdrop-blur-lg z-10 items-center border-2 border-white w-1/4 h-1/2 m-auto p-12'>
        <div className='text-2xl'>Login Form</div>
        <Input type='text' name='username' placeholder='Username'/>

        <Input type='password' name='password' placeholder='Password'/>
        <Button type='submit'>Login</Button>
    </form>
  )
}

export default LoginForm