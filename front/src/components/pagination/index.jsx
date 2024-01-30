import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./pagination.css";
import Article from '../article';

const PaginationComponent = ({ sortedData, itemsPerPage }) => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:5000/api/blogs?page=${page}` + (itemsPerPage ? `&limit=${itemsPerPage}` : '');

                const response = await axios.get(url);

                if (response.data && response.data.blogs && typeof response.data.total === 'number') {
                    setBlogs(response.data.blogs);
                    setTotalPages(Math.ceil(response.data.total / itemsPerPage));
                } else {
                    console.error("Invalid response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [page, itemsPerPage]);

    const handlePreviousClick = () => {
        setPage(page - 1);
    };

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const dataToMap = sortedData && sortedData.length > 0 ? sortedData : blogs;
    return (
        <div className='pagination__parent'>
            <h2 className="heading">All Blogs</h2>
            <div className='blogs__wrapper'>
                {dataToMap.map(blog => (
                    <Article id={blog._id} src={blog.src} content={blog.content} title={blog.title} key={blog._id} date={blog.createdDate} />
                ))}
            </div>
            {
                itemsPerPage ? (
                    <div className='pagination__wrapper'>
                        <button onClick={handlePreviousClick} disabled={page <= 1}>Previous</button>
                        <div className='pages__wrapper'>
                            <div className='current__page'>
                                <span>{page}</span>
                            </div>
                            <div>
                                <span>...</span>
                            </div>
                            <div>
                                <span>{totalPages}</span>
                            </div>
                        </div>
                        <button onClick={handleNextClick} disabled={page >= totalPages}>Next</button>
                    </div>
                ) : null
            }
        </div>
    );
};

export default PaginationComponent;