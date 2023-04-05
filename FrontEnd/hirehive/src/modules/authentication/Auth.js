import React from 'react'
import AuthState from "../../contexts/authentication/AuthState";
// import {
//     Routes,
//     Route,
// } from "react-router-dom";


import Login from './Login';

export default function Auth(props) {
    return (
        <AuthState>
            <div className="auth-container" style={{ backgroundColor: "var(--auth-bg-color)" }}>
                <Login darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} />
            </div>
        </AuthState>
    )
}
