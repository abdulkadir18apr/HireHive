import React from "react";
import { ReactComponent as Logo } from './img/hirehive.svg'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="py-0">
            <nav className="bg-sky-950 relative px-4 py-4 flex justify-between items-center border-y border-gray-400 dark:border-gray-700">
                <a className="text-3xl font-bold leading-none" href="/">
                    <Logo />
                </a>
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-gray-600 dark:text-gray-300 p-3">
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
                <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
                    <li>
                        <Link
                            className="text-sm text-yellow-500 hover:text-orange-600 font-bold dark:text-gray-300"
                            to='/'
                        >
                            Home
                        </Link>
                    </li>
                    <li className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            className="w-4 h-4 current-fill"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </li>
                    <li>
                        <Link className="text-sm text-yellow-500 hover:text-orange-500" to="/about">
                            About Us
                        </Link>
                    </li>
                    <li className="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            className="w-4 h-4 current-fill"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </li>
                    <li>
                        <Link
                            className="text-sm text-yellow-500 hover:text-orange-500 dark:text-gray-300"
                            to="/contact"
                        >
                            Contact Us
                        </Link>
                    </li>
                    <li className="text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            className="w-4 h-4 current-fill"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </li>
                    <li>
                        <Link
                            className="text-sm text-yellow-500  hover:text-orange-500 dark:text-gray-300"
                            to=""
                        >
                            Recruiters
                        </Link>
                    </li>
                </ul>
                <div className="space-x-2 hidden lg:block">
                    <button className="rounded-md border border-yellow-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-yellow-600 hover:bg-indigo-500 ">
                        <Link to="/authenticate">Student Login</Link>
                    </button>
                    <button className="rounded-md bg-yellow-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-sky-950 hover:bg-indigo-500 ">
                        <Link to="/recruiters/login">Recuriter Login</Link>
                    </button>
                </div>
            </nav>
        </div>
    );
};

