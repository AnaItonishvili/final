import Logo from "../../assets/logo.svg";
import Burger from "../../assets/burger.svg";
import React, { useState } from 'react'
import "./header.css";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="page header">
            <img className="logo" src={Logo} alt="logo" />
            <nav className="burger__nav">
                <img className="burger" src={Burger} alt="burger" onClick={() => setIsOpen(!isOpen)} />
                <div onClick={e => e.target.className.includes('burger__wrapper') && setIsOpen(false)} className={`burger__wrapper ${isOpen ? 'menu__open' : 'menu__close'}`}>
                    <ul className="burger__menu">
                        {/* <li className="menu__item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="menu__item">
                            <Link to="/about">Blog</Link>
                        </li>
                        <li className="menu__item">
                            <Link to="/contact">Contact</Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header