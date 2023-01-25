import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.jpg'
function navbar(props) {
    return (
        // <div className="nav-container">
        <nav style={{
            display: 'flex',
            height: '1.9cm',
            border: '10px',
            maxWidth: 'auto',
            backgroundColor: 'white',
            borderBottom: '3px solid whitesmoke'
        }}>

            <img stlye={{ height: '70px' }} src={logo} alt="logo" />
            <div style={{ marginLeft: '55%', marginTop: '1.5%' }}>
                < Link style={{ textDecoration: "none", color: 'rgb(46, 37, 102  ' }} to="/Projects"><b>Projects</b></Link>
                <Link style={{ textDecoration: "none", color: 'rgb(46, 37, 102', marginLeft: '10px' }} to="/Sites"><b>Sites</b></Link>
                <Link style={{ textDecoration: "none", color: 'rgb(46, 37, 102', marginLeft: '10px' }} to="/Devices"><b>Devices</b></Link>

            </div>
            {/* <a id="login" href="url">login</a> */}
        </nav>
        // </div>
    )
}

export default navbar;
