import React from 'react'


import Login from './Login';
import { RecruiterContextProvider } from './context/RecruiterContext';

export  function RecruiterAuth(props) {
    return (
        <RecruiterContextProvider>
               <div className="auth-container" style={{ backgroundColor: "var(--auth-bg-color)" }}>
                <Login darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} />
            </div>
        </RecruiterContextProvider>
         
    )
}
