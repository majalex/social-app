import './AppNav.css';
import { Link } from "react-router-dom"

const AppNav = (props) => {
    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!props.user && <li>
                    <Link to="/login">Login</Link>
                </li>}
                {!props.user && <li>
                    <Link to="/signup">SignUp</Link>
                </li>}
            </ul>
        </nav>
    )
}

export default AppNav;

