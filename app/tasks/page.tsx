import NavBar from '@/components/NavBar'
import NewTask from '@/components/Tasks/NewTask'
import Tasks from '@/components/Tasks/Tasks'
import { Button } from '@/components/ui/button'
import { CircleUserRound } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavBar />
      <div className='h-[92dvh] flex'>
        <div className='max-w-[20%] min-h-full backdrop-blur-xl py-4'>
          <NewTask />
          <Button className='w-full mb-4 rounded-r-xl space-x-2 bg-transparent hover:bg-white/10 text-white'><CircleUserRound /><div>Profile</div></Button>
        </div>
        <Tasks />
      </div>
    </div>
  )
}

export default page