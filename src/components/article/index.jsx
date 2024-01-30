import React from 'react'
import "./article.css";
import LinkIcon from '../../assets/link.svg';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

function Article({ id, src, alt, title, content, date }) {
    return (
        <div className='article__wrapper'>
            <img src={src} alt={alt ? alt : "blog featured image"} />
            {date ? <p className='article__date'>{formatDate(date)}</p> : null}
            <Link to={`/blog/${id}`} className='article__title__wrapper'>
                <h3>{title.substring(0, 25)}{title.length > 25 ? "..." : ""}</h3>
                <img src={LinkIcon} alt="link" />
            </Link>
            <p>{content.substring(0, 120)}{content.length > 120 ? "..." : ""}</p>
        </div>
    )
}

export default Article