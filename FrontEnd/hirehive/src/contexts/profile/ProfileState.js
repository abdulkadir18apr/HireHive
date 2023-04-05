import ProfileContext from "./ProfileContext";
import { useState } from "react";

import React from 'react'
function ProfileState(props) {
    const [profile, setProfile] = useState({});
    const host = "http://localhost:8000/";

    const getStudentProfile = async () => {
        const response = await fetch(`${host}api/student/profile/getprofiledetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem("token")
            },
        });

        const json = await response.json();
        console.log(json);
        setProfile(json);
    }


    return (
        <ProfileContext.Provider value={{ profile, getStudentProfile }} >
            {props.children}
        </ProfileContext.Provider>
    )
}
export default ProfileState;

