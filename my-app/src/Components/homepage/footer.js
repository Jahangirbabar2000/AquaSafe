// import { Button } from "react-bootstrap";

const Footer = () => {
    return (
        <footer style={{
            backgroundColor:'#474647',
            color: '#fff',
            height: "200px",
            display: 'flex'
        }}>
            <div >
            <ul style={{listStyle:'none', paddingTop:'30%'}}>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Sponsered by</li>

                </ul>
                </div>
                <div style={{marginLeft:'50%'}}><ul style={{listStyle:'none', paddingTop:'30%'}}>
                <li></li>
                <li></li>
                <li></li>

                </ul></div>
            
        </footer>
    );
}

export default Footer;