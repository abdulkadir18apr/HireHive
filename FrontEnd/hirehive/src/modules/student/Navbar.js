import React from "react";
import { ReactComponent as Logo } from '../homepage/img/hirehive.svg'
import ProfileContext from '../../contexts/profile/ProfileContext';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

export const Navbar = () => {

    const { getStudentProfile, profile } = useContext(ProfileContext);
    const [fullName, setFullName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const navigate = useNavigate();
    const StudentData = async () => {
        const res = await getStudentProfile();
        console.log(res);
        if (profile.BasicDetails != null) {
            const { BasicDetails: { firstName, lastName }, profileImage } = profile;
            setFullName(firstName.toUpperCase() + " " + lastName.toUpperCase());
            let url = profileImage.slice(6);
            setProfilePic("http://localhost:8000/" + url);
            console.log(fullName);
            console.log(profilePic)
        }


    }
    const studentLogout = () => {
        localStorage.removeItem('token');
        navigate('/');

    }
    useEffect(() => {
        StudentData();
    }, [])
    return (
        <div className="">
            <nav className="bg-sky-950 relative px-8 py-4 flex justify-between items-center border-y border-gray-400 dark:border-gray-700">
                <a className="text-3xl font-bold leading-none" href="/">
                    <Logo />
                </a>
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-yellow-600 dark:text-yellow-300 p-3">
                        <svg
                            className="block h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                <ul className="hidden lg:flex lg:items-center grow mx-10 space-x-6">
                    <li>
                        <a
                            className="text-sm text-yellow-500 hover:text-orange-600 dark:text-yellow-300"
                            href="/"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="text-sm text-yellow-500 hover:text-orange-500" href="/">
                            Interviews
                        </a>
                    </li>
                    <li>
                        <a
                            className="text-sm text-yellow-500 hover:text-orange-600 dark:text-yellow-300"
                            href="/"
                        >
                            Resources
                        </a>
                    </li>
                    <li>
                        <a
                            className="text-sm text-yellow-500 hover:text-orange-600 dark:text-yellow-300"
                            href="/"
                        >
                            Interview Experiences
                        </a>
                    </li>

                    <li>
                        <a
                            className="text-sm text-yellow-500 hover:text-orange-600 dark:text-yellow-300"
                            href="/"
                        >
                            Contact Cordinator
                        </a>
                    </li>
                </ul>
                <div className="hidden lg:block">
                    <div className="flex items-center space-x-2">
                        <span className="flex flex-col">
                            <span className="text-sm font-medium text-yellow-500 dark:text-yellow-100">
                                {fullName}
                            </span>
                            <span className="text-sm font-medium text-yellow-500 hover:text-orange-500 dark:text-yellow-400 cursor-pointer">
                                <Link to="profile">View Profile</Link>
                            </span>
                        </span>
                        <img
                            className="inline-block w-20 h-20 rounded-full"
                            src={profilePic}
                            alt="John Doe"
                        />
                        <button onClick={studentLogout} className="text-sm font-medium text-yellow-500 dark:text-yellow-100">
                            Logout
                        </button>



                    </div>
                </div>
            </nav>
        </div >
    );
};

export default Navbar;
// NavbarThree.displayName = "NavbarThree";
