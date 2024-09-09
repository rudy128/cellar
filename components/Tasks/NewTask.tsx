'use client'
import { CircleFadingPlus } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Input } from '../ui/input'
import { Calendar } from './../ui/calendar' // Ensure this is correctly imported
import { Cross2Icon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const NewTask = () => {
    const [task, setTask] = React.useState('')
    const [badges, setBadges] = React.useState<string[]>([])
    const [badgeInput, setBadgeInput] = React.useState('')
    const [editIndex, setEditIndex] = React.useState<number | null>(null)
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [time, setTime] = React.useState('00:00')
    const [type, setType] = React.useState('One-Time')
    const [exp, setExp] = React.useState('0.5')
    const [sessionToken, setSessionToken] = React.useState<string | null>(null);

    React.useEffect(()=>{
        const token = localStorage.getItem('authToken')
        setSessionToken(token)
    },[])

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dateTimeString = `${date?.toDateString()} ${time}`
        const response = await fetch('/api/tasks/newtask',{
            method: 'POST',
            body: JSON.stringify({
                task: task,
                badges:badges,
                type: type,
                exp:exp,
                dateTime:dateTimeString
            }),
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${sessionToken}`
            }
        })
        window.location.reload()
    }

    const handleBadgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBadgeInput(e.target.value)
    }

    const handleBadgeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault()
            const trimmedBadge = badgeInput.trim()
            if (trimmedBadge) {
                if (editIndex !== null) {
                    // Edit existing badge
                    setBadges(badges.map((badge, index) =>
                        index === editIndex ? trimmedBadge : badge
                    ))
                    setEditIndex(null)
                } else if (!badges.includes(trimmedBadge)) {
                    // Add new badge
                    setBadges([...badges, trimmedBadge])
                }
                setBadgeInput('')
            }
        }
    }

    const handleBadgeClick = (index: number) => {
        setBadgeInput(badges[index])
        setEditIndex(index)
    }

    const handleBadgeRemove = (badgeToRemove: string) => {
        setBadges(badges.filter(badge => badge !== badgeToRemove))
    }

    return (
        <div className='w-full mb-4'>
            <Dialog>
                <DialogTrigger className='w-full'>
                    <div className='w-[100%] rounded-r-xl flex py-2 px-4 space-x-2 bg-transpaarent hover:bg-white/10 text-white'>
                        <CircleFadingPlus className='h-6 w-6' />
                        <div className='text-nowrap'>New Task</div>
                    </div>
                </DialogTrigger>
                <DialogContent className='h-fit'>
                    <DialogTitle>New Task</DialogTitle>
                    <form onSubmit={handleOnSubmit} className='w-full space-y-4 py-8'>
                        <Input
                            placeholder='New Task'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className='rounded-xl'
                        />
                        <Input
                            placeholder='Badges'
                            onChange={handleBadgeInputChange}
                            onKeyDown={handleBadgeInputKeyDown}
                            value={badgeInput}
                            className='rounded-xl'
                        />
                        <div className='flex flex-wrap gap-2'>
                            {badges.map((badge, index) => (
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
                        <div className='flex gap-x-4'>
                            <div className='space-y-4'>
                                <div>Expiration Date:</div>
                                <Calendar
                                    mode='single'
                                    selected={date}
                                    onSelect={setDate}
                                    captionLayout='dropdown'
                                    className="rounded-xl w-fit border"
                                    initialFocus
                                />
                            </div>
                            <div className='flex flex-col justify-evenly px-4'>
                                <div className='w-full space-y-4'>
                                    <h1>Time:</h1>
                                    <Input
                                        placeholder={time}
                                        onChange={(e)=>{setTime(e.target.value)}}
                                        className='rounded-xl w-[70%] p-4'
                                    />
                                </div>
                                <div className='w-full space-y-4'>
                                    <h1>Exp:</h1>
                                    <Select onValueChange={(e)=>{setExp(e)}}>
                                        <SelectTrigger className='rounded-xl w-[60%] p-4'><SelectValue placeholder='0.5 xp' /></SelectTrigger>
                                        <SelectContent className='rounded-xl'>
                                            <SelectItem className='rounded-xl' value='0.5'>0.5 xp</SelectItem>
                                            <SelectItem className='rounded-xl' value='1'>1.0 xp</SelectItem>
                                            <SelectItem className='rounded-xl' value='2'>2 xp</SelectItem>
                                        </SelectContent>
                                    </Select>                                </div>
                                <div className='w-full space-y-4'>
                                    <h1>Type:</h1>
                                    <Select onValueChange={(value)=>{setType(value)}}>
                                        <SelectTrigger className='rounded-xl w-[60%] p-4'><SelectValue placeholder='One-Time' /></SelectTrigger>
                                        <SelectContent className='rounded-xl'>
                                            <SelectItem className='rounded-xl' value='One-Time'>One-Time</SelectItem>
                                            <SelectItem className='rounded-xl' value='Daily'>Daily</SelectItem>
                                            <SelectItem className='rounded-xl' value='Weekly'>Week</SelectItem>
                                            <SelectItem className='rounded-xl' value='Monthly'>Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <Button className='w-full rounded-xl' type='submit'>Add the Task</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewTask
