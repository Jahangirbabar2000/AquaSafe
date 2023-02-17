import "../homepage/homepage.css"
import logo from "../homepage/logo.jpg";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        // <div className="nav-container">
        <nav className="nav-container">
            <Link to="/homepage">
                <img className="logo-img" src={logo} alt="logo" />
            </Link>
        </nav>
        // </div>
    );
}