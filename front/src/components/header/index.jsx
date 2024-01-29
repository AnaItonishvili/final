import Logo from "../../assets/logo.svg";
import Burger from "../../assets/burger.svg";
import React, { useState } from 'react'
import "./header.css";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/user.svg";
import { useSelector } from "react-redux";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user);
    return (
        <header className="header__wrapper">
            <div className="page header">
                <Link to="/"><img className="logo" src={Logo} alt="logo" /></Link>
                <nav className="burger__nav">
                    <img className="burger" src={Burger} alt="burger" onClick={() => setIsOpen(!isOpen)} />
                    <div onClick={e => e.target.className.includes('burger__wrapper') && setIsOpen(false)} className={`burger__wrapper ${isOpen ? 'menu__open' : 'menu__close'}`}>
                        <ul className="burger__menu">
                            <li className="menu__item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="/blog">Blog</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <nav className="desktop__nav">
                    <ul className="desktop__menu">
                        <li className="menu__item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="menu__item">
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li className="menu__item">
                            <Link to={user.auth === true ? `/user/${user.userProfile.username}` : '/login'}><img src={UserIcon} alt="login" /></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header