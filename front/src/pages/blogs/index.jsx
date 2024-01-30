import React, { useState } from 'react'
import PaginationComponent from '../../components/pagination'
import Sort from '../../components/filters/sort'
import "./blogs.css";
import axios from 'axios';

function Blogs() {
  const [sortedData, setSortedData] = useState([]);
  const fetchSortedBlogs = async (sortOption) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/blogs/sort`, {
        params: {
          sort: sortOption,
        },
      });
      setSortedData(response.data);
    } catch (error) {
      console.error("Error fetching sorted blogs:", error);
      return [];
    }
  };
  return (
    <section className='blogs__wrapper page'>
      <Sort onSortChange={fetchSortedBlogs} />
      <PaginationComponent sortedData={sortedData} />
    </section>
  )
}

export default Blogs