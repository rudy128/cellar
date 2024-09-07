'use client'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import React, { useEffect, useState } from 'react'
import { DialogHeader } from './ui/dialog'
import { Button } from './ui/button'
import { BookPlus, Cross } from 'lucide-react'
import { Input } from './ui/input'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'

const NewBlog = () => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogBadges, setBlogBadges] = useState<string[]>([])
    const [blogContent, setBlogContent] = useState('')
    const [badgeInput, setBadgeInput] = useState('')
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    useEffect(()=>{
        const token = localStorage.getItem('authToken')
        setSessionToken(token)
    },[])

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(event)
        const response = await fetch(`/api/blogs/newpost/`, {
            method: 'POST',
            body: JSON.stringify({title: blogTitle,badges:blogBadges,content:blogContent}),
            headers:{
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${sessionToken}`
            },
        })
    }

    const handleBadgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBadgeInput(e.target.value)
    }
    const randomColours = () => { // Add colours to badges
        const colours: string[] = ['']
        const rand = Math.floor(Math.random() * (colours.length))
        return colours[rand]
    }
    const handleBadgeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault()
            const trimmedBadge = badgeInput.trim()
            if (trimmedBadge) {
                if (editIndex !== null) {
                    // Edit existing badge
                    setBlogBadges(blogBadges.map((badge, index) =>
                        index === editIndex ? trimmedBadge : badge
                    ))
                    setEditIndex(null)
                } else if (!blogBadges.includes(trimmedBadge)) {
                    // Add new badge
                    setBlogBadges([...blogBadges, trimmedBadge])
                }
                setBadgeInput('')
            }
        }
    }
    const handleBadgeClick = (index: number) => {
        setBadgeInput(blogBadges[index])
        setEditIndex(index)
    }
    const handleBadgeRemove = (badgeToRemove: string) => {
        setBlogBadges(blogBadges.filter(badge => badge !== badgeToRemove))
    }

    return (
    <div>
    <Dialog>
        <DialogTrigger>
            <Button className='w-full mb-4 rounded-r-xl space-x-2 bg-transparent hover:bg-white/10 text-white'><BookPlus /><div>New Post</div></Button>
        </DialogTrigger>
        <DialogContent className=''>
            <DialogHeader className='mb-[5%]'>
                <DialogTitle>New Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleOnSubmit} className='w-full h-full'>
                <Input
                    className='rounded-xl mb-[5%]'
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder='Blog Title'
                />
                <Input
                    className='rounded-xl mb-[2%]'
                    value={badgeInput}
                    onChange={handleBadgeInputChange}
                    onKeyDown={handleBadgeInputKeyDown}
                    placeholder='Type badges and press Enter or Comma'
                />
                <div className='flex space-x-4 mb-[3%]'>
                    {blogBadges.map((badge, index) => (
                        <button key={index} onClick={()=>handleBadgeClick(index)} className={`bg-background flex border rounded-3xl py-2 px-4 space-x-4`}>
                            <span className='rounded-full text-xs'>
                                {badge}
                            </span>
                            <Cross2Icon
                                type='button'
                                onClick={() => handleBadgeRemove(badge)}
                            />
                        </button>
                    ))}
                </div>
                <textarea name="" id="" placeholder='Your Text here' onChange={(e)=>{setBlogContent(e.target.value)}} className='mb-[5%] w-full flex h-[50%] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                <Button type='submit' className='w-full rounded-xl'>Publish</Button>
            </form>
        </DialogContent>
    </Dialog>
    </div>
    )
}

export default NewBlog