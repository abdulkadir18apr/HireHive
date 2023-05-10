import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from "./Navbar"
import ProfileContext from '../../contexts/profile/ProfileContext';

import "./profileComponents/css/dashboard.css"
import { Jobcard } from '../recruiter/components/Jobcard';
import { fetchJobs, getCompanyLogo } from './context/apicall';
import { useStudentContext } from './context/StudentContext';


export default function Dashboard() {
    const navigate = useNavigate();
    const location=useLocation();
    const [loading, setLoading] = useState(true);
    const { profile, fullName, profilePic, getStudentProfile } = useContext(ProfileContext);

    const {state,dispatch}=useStudentContext();

    const fetchStudent = async () => {

        const res = await getStudentProfile();

    }

    const getJobData=async()=>{
        const res=await fetchJobs();
        if(res.success){
            dispatch({type:"setJob",payload:res.jobs});
        }

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


    useEffect(()=>{
        getJobData();
    },[])



    return (
        <div className=' overflow: auto;'>

            {console.log(profile)}

            {loading ? <p>Loading............</p> : <div className='sticky top-0 z-20'>
                <Navbar />
            </div>
            }
            {
                location.pathname==="/student" && <StudentDashBoard/>
            }

            <Outlet />




        </div>

    )
}


const StudentDashBoard=()=>{

    const {state}=useStudentContext();
    const {jobs}=state;
    console.log(jobs)


    return(
        <div className='student-dashboard'>
            <div className="student-header header">
                <h1>Welcome to Student Central: Your Path to Professional Growth</h1>
                <p>This comprehensive portal is designed exclusively for students like you, providing a centralized hub for all your academic and career needs. From exploring exciting internship opportunities to accessing valuable resources, this dashboard is your go-to platform for enhancing your educational journey and preparing for future success</p>
            </div>
          
            <div className='upcoming'>
            <h2>Important Notifications</h2>
            <ul>
                <li>
                    Wriiten Test of Accenture has be scheduled on 12/12/12
                </li>
                <li>
                    Wriiten Test of Accenture has be scheduled on 12/12/12
                </li>
                <li>
                    Wriiten Test of Accenture has be scheduled on 12/12/12
                </li>
            </ul>


            </div>
            <div className='open-jobs'>
                <h2>Job Drives</h2>
                <div className="jobs">
                    {
                        jobs.map((job)=>(

                                 <Jobcard companyName={job?.recruiter?.companyName} skills={job?.skills} salary={job?.salary} qualification={job?.qualification} cuttoff={job?.cuttoff} document={job?.document} url={""}  recruiterId={job.recruiter?._id}/>
                            
                        ))
                    }
                </div>
             
            </div>
    
        </div>
    )
}