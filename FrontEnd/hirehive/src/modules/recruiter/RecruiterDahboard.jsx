import React from 'react'
import Navbar from './components/Navbar'
import {  useRecruiterContext } from './context/RecruiterContext'
import { Outlet, useLocation } from 'react-router-dom'
import { fetchJob, getProfile } from './context/apicalls'
import { useEffect } from 'react'


import "./css/dashboard.css"
import { Jobcard } from './components/Jobcard'
import { StudentCard } from './components/StudentCard'




export  function RecruiterDahboard() {
  const {state,dispatch}=useRecruiterContext();
  const location=useLocation();


  const setProfile=async()=>{
    const res=await getProfile();
    if(res.success){
      dispatch({type:"setProfile",payload:res.profile})
    }

  }

  const getJoData=async()=>{


    const res=await fetchJob();
    if(res.success){
      dispatch({type:"setJob",payload:res.jobs})
    }
  }


  // useEffect(()=>{
   
  
  //   getJoData();

  // },[])


  useEffect(()=>{
    setProfile();
  },[])

  useEffect(()=>{
    getJoData();
  },[])


  return (
    <div>
        <Navbar/>
        {
          location.pathname==="/recruiters" && <Dashboard/>
        }
        <Outlet/>
    </div>
  )
}

const Dashboard=()=>{

  const {state}=useRecruiterContext();
  
  const url=state.profile.companyLogo ? `http:\\\\localhost:8000${state.profile.companyLogo?.slice(6)}`:"";

  const companyName=state.recruiter?.comapnyName;


  return(
    <div className='dashboard'>



      <div className="jobs">
        <h2 className='recent_heading'>Recent Jobs Posted</h2>
        {
          state.jobs.map((job)=>(
            <Jobcard key={job._id} companyLogo={state.profile?.comapnyLogo} comapnyName={state.profile.companyName} position={job.position} skills={job.skills} salary={job.salary} qualification={job.qualification} cuttoff={job?.cuttoff} document={job?.document} url={url} companyName={companyName} />

          ))
        }
      </div>
      <div className="recent">
        <h2 className='recent_heading'>Recent Applications</h2>
        <StudentCard/>
        </div>
        
      </div>
  )




}