'use client'
import { TaskTypes } from '@/types/tasks'
import React, { useEffect, useState } from 'react'
import getRandomLightColor from '../colourgenerator'
import { DialogContent, DialogTitle, DialogTrigger,Dialog, DialogHeader, DialogDescription } from '../ui/dialog'
import { Checkbox } from '../ui/checkbox'

const Tasks = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tasks, setTasks] = useState<any[]>([])
    const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set())
    const [sessionToken, setSessionToken] = React.useState<string | null>(null);

    useEffect(()=>{
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/tasks/', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log(data); // Log the fetched data to ensure it's coming through
                setTasks(data); // Set the data to state
            } catch (error: any) {
                console.error('Error fetching blogs:', error);
                setError(error.message); // Set the error message to state
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }

        }

        fetchTasks()
        const token = localStorage.getItem('authToken')
        setSessionToken(token)
    },[])

    const handleCheckboxChange = async (taskId: number) => {
        setCheckedTasks(prevCheckedTasks => {
            const updatedCheckedTasks = new Set(prevCheckedTasks);
            if (updatedCheckedTasks.has(taskId)) {
                updatedCheckedTasks.delete(taskId);
            } else {
                updatedCheckedTasks.add(taskId);
            }
            return updatedCheckedTasks;
        });
        const response = await fetch('/api/tasks',{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${sessionToken}`
            },
            body: JSON.stringify({checkedTasks:checkedTasks})
        })
    }
    const renderTasks = (tasksArray: any[], type: string) => (
        <div className='space-y-2 my-4 mt-0 mx-2'>
            <div className='text-xl font-semibold'>{type} Tasks</div>
            {tasksArray.length === 0 ? (
                <div>No {type.toLowerCase()} tasks available</div>
            ) : (<div className='flex flex-wrap gap-x-4'>
                {tasksArray.map((task, index) => (
                    <Dialog>
                        <DialogTrigger>
                        <div key={index} className='text-xs border border-white/10 p-4 space-y-2 w-fit bg-white/25 shadow-2xl shadow-white/30 backdrop-blur-lg rounded-3xl'>
                        <h3 className='text-base font-bold'>{task.Task}</h3>
                        <div className='flex flex-wrap gap-2 w-36'>
                            {task.Badges.map((badge:any,key:any)=>(<div key={key} style={{backgroundColor:getRandomLightColor()}} className='text-background px-2 rounded-3xl'>{badge}</div>))}
                        </div>
                        <div className='flex flex-wrap'>
                            <strong>Deadline:</strong>&nbsp;{new Date(task.ExpirationTime).getHours().toString().padStart(2, '0')}:{new Date(task.ExpirationTime).getMinutes().toString().padStart(2, '0')} {new Date(task.ExpirationTime).getDate()}/{new Date(task.ExpirationTime).getMonth()}
                        </div>
                        <div className='flex gap-x-4'>
                            <div>
                                <strong>Type:</strong> {task.Type}
                            </div>
                            <div>
                                <strong>Exp:</strong> {task.Exp}
                            </div>
                        </div>
                    </div>
                        </DialogTrigger>
                        <DialogContent className='h-fit space-y-4 w-fit'>
                            <DialogTitle>{task.Task}</DialogTitle>
                            <DialogDescription><strong>Deadline:&nbsp;</strong>{task.ExpirationTime}</DialogDescription>
                            <DialogDescription className='flex flex-row flex-wrap items-center w-full gap-2'>
                            {task.Badges.map((badge:any,key:any)=>(<div key={key} style={{backgroundColor:getRandomLightColor()}} className='text-background h-full px-2 rounded-3xl'>{badge}</div>))}
                            </DialogDescription>
                            <DialogDescription className='flex w-full justify-between'>
                                <div><strong>Type:&nbsp;</strong>{task.Type}</div>
                                <div><strong>Exp:&nbsp;</strong>{task.Exp}</div>
                            </DialogDescription>
                            <Checkbox onChange={(e)=>handleCheckboxChange(index)} /> //Checkbox isn't working properly. So look at it
                            </DialogContent>
                    </Dialog>
                ))}</div>
            )}
        </div>
    )

    return (
        <div className='w-full p-4'>
            {!loading ?
            <div className='flex w-full'>
                <div className='w-3/5'>{Object.keys(tasks).map((key:any) => (
                    renderTasks(tasks[key] || [], key.charAt(0).toUpperCase() + key.slice(1).replace('Tasks', ''))
                ))}</div>
                <div className='w-2/5'>hello</div>
            </div>
            :
            <div>lel</div>}

            
            {/* {tasks?.oneTimeTasks.map((key) => (<div>Hello</div>))} */}

            {/* {tasks.map((task,index)=>(
                <div key={index}>
                    <div>
                        <h1>{task.Task}</h1>
                    </div>
                </div>
            ))} */}
        </div>
    )
}

export default Tasks