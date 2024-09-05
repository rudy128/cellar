import NavBar from '@/components/NavBar'
import { Checkbox } from '@/components/ui/checkbox'
import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <NavBar />
        <div className='w-full p-8 h-[95dvh]'>
            <div className='bg-white/20 rounded-xl backdrop-blur-lg h-[90dvh]'>
                <div className='flex justify-between p-8 items-center h-1/12 bg-white/5'>
                    <Checkbox />
                    <div>
                        <h1>Lorem ipsum dolor sit amet.</h1>
                        <h6>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, commodi.</h6>
                    </div>
                    <div>
                        <div>Date</div>
                        <div>Time</div>
                    </div>
                    <Link href={''} >
                        <EllipsisVertical />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page