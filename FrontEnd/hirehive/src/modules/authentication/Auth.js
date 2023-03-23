import React from 'react'
// import {
//     Routes,
//     Route,
// } from "react-router-dom";

import Login from './Login';

export default function Auth(props) {
    return (
        <div className="auth-container" style={{ backgroundColor: "var(--auth-bg-color)" }}>
            <Login darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} />
        </div>
    )
}
