import React from 'react'
import "./Footer.css";
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h4> Meddiwiser</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod aperiam eaque blanditiis sequi debitis optio autem. Consequatur tenetur alias voluptates numquam sit cum sunt odit.</p>
                </div>

                <div className="footer-middle">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/doctors">All Doctors</Link></li>
                        <li><Link to="/appointments">Appointments</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-right">
                    <h5>Contact Us</h5>
                    <p>Phone: +91 98765 43210</p>
                    <p>Email: contact@Meddiwiser.com</p>
                    <p>Address: 91 Main Street, Delhi, India</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Meddiwiser All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer