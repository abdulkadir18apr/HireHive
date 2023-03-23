import React, { useState } from 'react'
import { Link } from "react-router-dom";


import "./css/navbar.css";

export default function Navbar() {
    const [show, setShow] = useState(0);
    const toggleNavbar = () => {
        if (show === "show") {
            setShow("");
        }
        else {
            setShow("show");
        }
    }
    return (
        <div className="navbar">
            <div className="hamburger">
                <button id="hamburger-btn" onClick={toggleNavbar}><img src={require('./img/hamburger-icon.png')} alt="Hamburger" /></button>
            </div>
            <ul className={`left nav-list ${show}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/">Interview</a></li>
                <li><a href="/">Jobs</a></li>
                <li><a href="/">About</a></li>
            </ul>
            <ul className={`right nav-list ${show}`} id="switch">
                <li><div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: "#ea580c" }}>DarkMode</label>
                </div></li>
                <li><Link to="/authenticate">Login</Link></li>
                <li><Link to="/authenticate">Login-Employer</Link></li>
                <li><Link to="/authenticate">Login-Admin</Link></li>
            </ul>
        </div>
    )
}
