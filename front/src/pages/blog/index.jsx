import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./blog.css";
import { useDispatch } from 'react-redux';
import { showError } from '../../redux/slices/uiSlice';
import formatDate from '../../utils/formatDate';

function Blog() {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/blog/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                dispatch(showError("Could not fetch the blog data"));
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(blog)
    return (
        <section className='page blog__wrapper'>
            {blog ? (
                <>
                    <img src={blog.src} alt={blog.title} />
                    <div className='blog__details'>
                        <div>
                            {blog.username ? <span>{blog.username}</span> : null}
                            <span>{Math.ceil(blog.content.split(" ").length / 235)} min read</span>
                        </div>
                        {blog.createdDate ? <span className='date'>{formatDate(blog.createdDate)}</span> : null}
                    </div>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                </>
            ) : (
                <p>Blog not found.</p>
            )}
        </section>
    );
}

export default Blog
