import React from 'react'
import Hero from './hero'
import RecentBlogs from './recent'
import PaginationComponent from '../../components/pagination'

function Home() {
    return (
        <main>
            <Hero />
            <RecentBlogs />
            <section className='page'>
                <PaginationComponent itemsPerPage={4} />
            </section>
        </main>
    )
}

export default Home