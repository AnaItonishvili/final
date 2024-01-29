import React from 'react'
import "./article.css";
import LinkIcon from '../../assets/link.svg';
import { Link } from 'react-router-dom';

function Article({ id, src, alt, title, content }) {
    return (
        <div className='article__wrapper'>
            <img src={src} alt={alt ? alt : "blog featured image"} />
            <Link to={`/blog/${id}`} className='article__title__wrapper'>
                <h3>{title.substring(0, 25)}...</h3>
                <img src={LinkIcon} alt="link" />
            </Link>
            <p>{content.substring(0, 120)}...</p>
        </div>
    )
}

export default Article