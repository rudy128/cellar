import { Inter } from 'next/font/google';
import React from 'react'

const inter = Inter({ subsets: ["latin"] });

function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`max-w-[20%] min-h-full backdrop-blur-xl py-4 `}>
      {children}
    </div>
  )
}

export default SideBar