import Link from 'next/link'
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Separator } from './ui/separator'
import { BookMarked, CircleCheckBig } from 'lucide-react'
import dynamic from 'next/dynamic'

const TimeComponent = dynamic(()=> import('./Time'),{ssr:false})

const TokenChecker = dynamic(()=> import('./tokenChecker'),{ssr:false})

const NavBar = () => {

  return (
    <div className='bg-orange-900/45 sticky top-0 left-0 z-20 backdrop-blur-md flex justify-between items-center w-full p-4 rounded-b-xl'>
      <TokenChecker />
        <Sheet>
          <SheetTrigger><HamburgerMenuIcon /></SheetTrigger>
          <SheetContent className='space-y-8'>
            <SheetTitle>Menu</SheetTitle>
            <div>
              <Link href={'/blogs'} >
                <SheetHeader>
                  <div className='flex'><BookMarked size={30} className='mr-8'/>Blogs</div>
                  <br />
                  <br />
                </SheetHeader>
              </Link>
              <Separator />
            </div>
            <div>
              <Link href={'/tasks'} >
                <SheetHeader>
                  <div className='flex'><CircleCheckBig size={30} className='mr-8'/>Tasks</div>
                  <br />
                  <br />
                </SheetHeader>
              </Link>
              <Separator />
            </div>
          </SheetContent>
        </Sheet>
        <div>Rudeus`s Cellar</div>
        <TimeComponent />
        <div className='w-1/4 flex justify-evenly items-center'>
            <Link href={''}>Home</Link>
            <Link href={''}>About</Link>
            <Link href={''}>Profile</Link>
        </div>
    </div>
  )
}

export default NavBar