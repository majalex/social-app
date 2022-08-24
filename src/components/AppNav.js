import './AppNav.css';
import { Link } from "react-router-dom"

const AppNav = () => {
    return(
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">SignUp</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav;

