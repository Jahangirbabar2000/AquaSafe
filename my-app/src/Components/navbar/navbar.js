import "../homepage/homepage.css"
import logo from "../homepage/logo.jpg";

export default function Navbar() {
    return (
        // <div className="nav-container">
        <nav className="nav-container">
            <img className="logo-img" src={logo} alt="logo" />
        </nav>
        // </div>
    );
}