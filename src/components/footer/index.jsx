import { Link } from "react-router-dom";
import "./footer.css";
import { useSelector } from "react-redux";
import UserIcon from "../../assets/user.svg";

function Footer() {
    const user = useSelector((state) => state.user);
    return (
        <footer className="footer__wrapper">
            <div className="page">
                <nav className="desktop__nav">
                    <ul className="desktop__menu">
                        <li className="menu__item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="menu__item">
                            <Link to="/blogs">Blog</Link>
                        </li>
                        <li className="menu__item">
                            <Link
                                to={
                                    user.auth === true
                                        ? `/user/${user.userProfile.username}`
                                        : "/login"
                                }
                            >
                                <img src={UserIcon} alt="login" />
                            </Link>
                        </li>
                    </ul>
                </nav>
                <p>© 2024 / <a target="_blank" href="https://github.com/AnaItonishvili/final">Repo</a></p>
            </div>
        </footer>
    )
}

export default Footer