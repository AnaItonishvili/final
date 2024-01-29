import React from 'react'
import "./article.css";
import Link from '../../assets/link.svg';

function Article({ src, alt, title, content }) {
    return (
        <div className='article__wrapper'>
            <img src={src} alt={alt ? alt : "blog featured image"} />
            <div className='article__title__wrapper'>
                <h3>{title.substring(0, 25)}...</h3>
                <img src={Link} alt="link" />
            </div>
            <p>{content.substring(0, 120)}...</p>
        </div>
    )
}

export default Article