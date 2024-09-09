'use client'
import { BlogData } from '@/types/blog'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Blog = () => {
    const [data, setData] = useState<BlogData | null>(null)
    const [alias, setAlias] = useState('Anonymous')
    const [comment, setComment] = useState('')
    const pathname = usePathname()
    const pathnameList = pathname.split('/')
    const path = pathnameList[pathnameList.length -1]


    async function fetchData() {
        const response = await fetch(`/api/blogs/${path}`);
        const result = await response.json();
        setData(result.data)
    }

    useEffect(()=>{
        try {
            fetchData();
        } catch (error) {
            console.error("Error: ",error)
        }
    },[path])

    if (data===null) {
        return <div>Loading...</div>
    }

    const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
        const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Convert to a readable string
    };


    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const response = await fetch(`/api/blogs/${path}/newcomment`, {
            method: 'POST',
            body: JSON.stringify({commenter: alias,comment:comment}),
            headers:{
            'Content-Type' : 'application/json',
            }
        })
    }

    // console.log(data.Comments)

    return (
        <div className='w-full h-full'>
            <div>{data.Headline}</div>
            <div>{formatDate(data.Date)}</div>
            <div>{data.Content}</div>
            <div>Comments</div>
            <form className='' onSubmit={handleOnSubmit}>
                <Input onChange={(e)=>{setAlias(e.target.value)}} className='w-1/2 rounded-xl' placeholder={alias} />
                <textarea onChange={(e)=>{setComment(e.target.value)}} className='w-2/4 flex min-h-[20dvh] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' name="addcomment" id="addcomment" placeholder='Type your Comment here.'/>
                <Button type='submit'>Submit</Button>
            </form> {/* Add Comments */}
            {Object.entries(data.Comments).map(([author, comment], index) => (
                <div key={index}>
                    <div><strong>{author}:</strong></div>
                    <div>{comment}</div>
                </div>
            ))}
        </div>
    )
}

export default Blog
