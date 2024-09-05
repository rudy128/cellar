import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import React from 'react'

const page = () => {
  return (
    <div>
        <NavBar />
        <div className='flex justify-between items-center w-full h-full'>
          <SideBar />
          <div>Home</div>
        </div>
    </div>
  )
}

export default page