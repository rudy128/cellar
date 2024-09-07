'use client'
import React, { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';

const BlogPosts = () => {
    const [blogs, setBlogs] = useState<any[]>([]); // State to hold the fetched blogs
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState<string | null>(null); // State to manage errors

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs/', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log(data); // Log the fetched data to ensure it's coming through
                setBlogs(data); // Set the data to state
            } catch (error: any) {
                console.error('Error fetching blogs:', error);
                setError(error.message); // Set the error message to state
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchBlogs(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div className='space-y-4'>
            {loading && <p>Loading...</p>}

            {/* Render the fetched blogs */}
            {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                    <div key={index} className='w-[75dvw] lg:w-[85dvw] flex rounded-xl justify-between p-8 items-center h-1/12 bg-white/5'>
                        <Checkbox />
                        <div>
                            <h1>{blog.Headline}</h1>
                            <h6>{blog.Content}</h6>
                        </div>
                        <div>
                            <div>Date</div>
                            <div>Time</div>
                        </div>
                        <Link href={''} >
                            <EllipsisVertical />
                        </Link>
                    </div>
                ))
            ) : (
                !loading && <p>No blogs found.</p>
            )}

            {error && <p>Error: {error}</p>}
        </div>
    )
}

export default BlogPosts
