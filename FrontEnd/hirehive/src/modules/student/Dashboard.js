import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from "./Navbar"
import ProfileContext from '../../contexts/profile/ProfileContext';
import ProfileState from '../../contexts/profile/ProfileState';
import Profile from "./Profile";
import {
    Routes,
    Route,
} from "react-router-dom";


export default function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {

            navigate('/authenticate');
            alert("Please Login First");

        }

    }, [])
    return (
        <div className='student-navbar'>

            <Navbar />
            <Outlet />



        </div>

    )
}
