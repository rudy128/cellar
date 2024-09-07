import BlogPosts from '@/components/BlogPosts';
import NavBar from '@/components/NavBar';
import NewBlog from '@/components/NewBlog';
import { Button } from '@/components/ui/button';
import { BookPlus, LucideMousePointerSquareDashed } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NewBlogPost = dynamic(()=> import('@/components/NewBlog'),{ssr:false})
const BlogPost = dynamic(()=> import('@/components/BlogPosts'),{ssr:false})


const Page = () => {

    return (
        <div>
            <NavBar />
            <div className='w-full flex h-[95dvh] py-4 space-x-8'>
                <div className='max-w-[20%] min-h-full backdrop-blur-xl'>
                    <NewBlogPost />
                    <Link href={''}><Button className='w-full mb-4 rounded-r-xl space-x-2 bg-transparent hover:bg-white/10 text-white'><LucideMousePointerSquareDashed /><div>Draft</div></Button></Link>
                </div>
                <BlogPost />
            </div>
        </div>
    );
};

export default Page;
