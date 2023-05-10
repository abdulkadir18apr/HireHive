import React, { useEffect, useState } from 'react'
import "../css/dashboard.css"
import { useRecruiterContext } from '../context/RecruiterContext'
import { getCompanyLogo } from '../../student/context/apicall';

export  function Jobcard({key,position,skills,salary,qualification,cuttoff,document,url,companyName,recruiterId}) {

    const host=`http:\\\\localhost:8000`;

   

    const [logo,setLogo]=useState(url);
    const {state}=useRecruiterContext();
    const doc= `http:\\\\localhost:8000${document?.slice(6)}`;

    const getLogo=async(id)=>{
        const res=await getCompanyLogo(id);
        if(res.success){
            const img=`${host}${res?.logo[0]?.companyLogo?.slice(6)}`
            setLogo(img);
            console.log(`${host}${res?.logo[0]?.companyLogo?.slice(6)}`);

        }
    }

    useEffect(()=>{
       
        if(logo===""){
            getLogo(recruiterId);
        }
    },[])


  return (
    <div className='job_card' key={key}>
          <img src={logo} alt="companylogo"/>
          <h1>{companyName}</h1>
          <h2>{position}</h2>
        <p>Skills: <span>{skills}</span></p>
          <p>Package:<span>{salary|| "Not disclosed"}</span></p>
          <p>Qualification:<span>{qualification}</span> </p>
          <p>eligibility criteria:<span>{cuttoff}</span> </p>
          <div className="job_btn">
          <a href={doc} target="_blank"  ><button>Job Description</button></a>
          <button>View More Detail</button>
          </div>
   
        </div>
  )
}
