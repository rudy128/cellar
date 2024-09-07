'use client';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleOnSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    // console.log(username, password)
    const response = await fetch(`/api/auth/`, {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers:{
        'Content-Type' : 'application/json',
      },
    });

    const result = await response.json();
    const expirationTime = new Date().getTime() + 7200 * 1000
    if (response.ok) {
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('expirationTime', expirationTime.toString());
      router.push('/dashboard');
    } else {
      console.error('Login Failed: ', result.error);
    }
  }
  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col justify-center space-y-12 backdrop-blur-lg z-10 items-center border-2 border-white w-1/4 h-1/2 m-auto p-12'>
        <div className='text-2xl'>Login Form</div>
        <Input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} name='username' placeholder='Username'/>

        <Input type='password' name='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <Button type='submit'>Login</Button>
    </form>
  )
}

export default LoginForm