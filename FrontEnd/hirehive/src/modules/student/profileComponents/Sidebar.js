import React, { useContext, useState } from 'react'
import "./css/sidebar.css"
import img3 from "../../homepage/img/hirehive.svg";
import { NavLink } from "react-router-dom";
import ProfileContext from '../../../contexts/profile/ProfileContext';

export default function Sidebar({ path = "profile" }) {

    const { uploadProfileImage, profilePic, fullName } = useContext(ProfileContext)

    const url = profilePic !== "" ? `http://localhost:8000${profilePic.slice(6)}` : "";

    const uploadPicture = async (e) => {
        if (!e.target.files) {
            alert("Please Select File")
        }
        else {
            const res = await uploadProfileImage(e.target.files[0]);

            if (res) {
                alert("profile picture updated");
            }
            else {
                alert("Please Try Again");
            }
        }
    }


    return (

        <div className="wrapper">
            <div className="sidebar">
                <div className="profile">
                    <img className="logo" src={url} alt="profile_picture" width="100" height="100" />
                    <div className="round">
                        <input type="file" onChange={uploadPicture} />
                        <i className="fa-solid fa-camera"></i>
                    </div>

                </div>
                <h4>{fullName}</h4>
                <ul>
                    <li><NavLink to={`../${path}/basic`} activeClassName="active">
                        <span className="icon"><i className="fa-solid fa-user"></i></span>
                        <span className="item">Basic Details</span>
                    </NavLink>
                    </li>
                    <li><NavLink to={`../profile/education`} activeClassName="active" >
                        <span className="icon"><i className="fa-solid fa-user-graduate"></i></span>
                        <span className="item">Education Details</span>
                    </NavLink>
                    </li>
                    <li><NavLink to={`../profile/skills`} activeClassName="active">
                        <span className="icon"><i className="fa-solid fa-code"></i></span>
                        <span className="item">Skills & Languages</span>
                    </NavLink>
                    </li>
                    <li><NavLink to={'../profile/project'} activeClassName="active">
                        <span className="icon"><i className="fa-solid fa-lightbulb"></i></span>
                        <span className="item">Projects</span>
                    </NavLink>
                    </li>
                    <li><NavLink to="../profile/resume" activeClassName="active">
                        <span className="icon"><i className="fa-solid fa-file"></i></span>
                        <span className="item">Documents</span>
                    </NavLink>
                    </li>
                    <li><NavLink to={`../profile/intership`} activeClassName="active">
                        <span className="icon"><i className="fa-solid fa-briefcase"></i></span>
                        <span className="item">Interships</span>
                    </NavLink>
                    </li>
                    <li><NavLink to="../profile/certificate" activeClassName="active">
                        <span className="icon"><i className="fa-solid fa-award"></i></span>
                        <span className="item">Certification</span>
                    </NavLink>
                    </li>
                </ul>
            </div>
            <div className="section">
                <div className="top_navbar">
                    <div className="hamburger">
                        <NavLink href="#"><i className="las la-list"></i></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
