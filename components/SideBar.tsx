import { Book, BookMarked } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (
    <div className='w-32 h-[95dvh] p-4'>
        <Link href={''}>
            <BookMarked />
        </Link>
    </div>
  )
}

export default SideBar