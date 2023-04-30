import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from "./Navbar"
import ProfileContext from '../../contexts/profile/ProfileContext';



export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { profile, fullName, profilePic, getStudentProfile } = useContext(ProfileContext);

    const fetchStudent = async () => {
        const res = await getStudentProfile();

    }





    useEffect(() => {
        if (!localStorage.getItem('token')) {

            navigate('/authenticate');
            alert("Please Login First");

        }
        else {
            fetchStudent();
            setLoading(false);
        }
        console.log(loading);


    }, [])
    return (
        <div className=' overflow: auto;'>

            {console.log(profile)}

            {loading ? <p>Loading............</p> : <div className='sticky top-0 z-20'>
                <Navbar />
            </div>
            }

            <Outlet />




        </div>

    )
}
