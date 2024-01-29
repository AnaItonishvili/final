import React, { useEffect, useState } from 'react'
import "./recent.css";
import axios from 'axios';

import Article from '../../../components/article'

function RecentBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function getArticles() {
            const request = await axios.get("http://localhost:5000/api/blogs");
            const data = request.data;
            if (data && data.length > 0) {
                setBlogs(data);
            }
            console.log(data);
        }

        getArticles();
    }, []);

    return (
        <section className='recents__wrapper'>
            <div className='page'>
                <h2>Recent blog posts</h2>
                <div className='blogs__wrapper'>
                    {blogs.map(blog => {
                        return <Article src={blog.src} content={blog.content} title={blog.title} key={blog._id} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default RecentBlogs