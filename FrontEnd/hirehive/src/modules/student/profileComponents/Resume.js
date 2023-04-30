import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';


import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";

export default function Project() {
    const { profile,uploadResume,uploadMarksheets } = useContext(ProfileContext);
    const { resume } = profile;
    const {classTen}=profile.EducationDetails;
    const {classTwelve}=profile.EducationDetails;
    const {diploma}=profile.EducationDetails;
    

    let url=""

     url = resume?"http://localhost:8000/" + resume?.slice(6):"";

     const [resumeInput,setResumeInput]=useState();


     const uploadResumeInput = async (e) => {
        if (!e.target.files) {
            alert("Please Select File")
        }
        else {
            setResumeInput(e.target.files[0])
        }
    }

    const uploadResumeHandler=async()=>{
       const res=await uploadResume(resumeInput);
       if(res){
        alert("Resume Uploaded");
       }
       else{
        alert("Something Went Wrong");
       }

    }

    const uploadClassXHandler=async()=>{
        // console.log(resumeInput)
        const res=await uploadMarksheets(resumeInput,"classTen");
        if(res){
            alert("Marksheet Uploaded");
        }
        else{
            alert("something Went Wrong....")
        }

    }
    const uploadClassXIIHandler=async()=>{
        // console.log(resumeInput)
        const res=await uploadMarksheets(resumeInput,"classTwelve");
        if(res){
            alert("Marksheet Uploaded");
        }
        else{
            alert("something Went Wrong....")
        }

    }
    const uploadClassDiplomaHandler=async()=>{
        const res=await uploadMarksheets(resumeInput,"diploma");
        if(res){
            alert("Marksheet Uploaded");
        }
        else{
            alert("something Went Wrong....")
        }
    }
    const uploadmastersHandler=async()=>{
        const res=await uploadMarksheets(resumeInput,"masters");
        if(res){
            alert("Marksheet Uploaded");
        }
        else{
            alert("something Went Wrong....")
        }
    }
    const uploadbachelorsHandler=async()=>{
        const res=await uploadMarksheets(resumeInput,"bachelors");
        if(res){
            alert("Marksheet Uploaded");
        }
        else{
            alert("something Went Wrong....")
        }
    }


    
    return (
        <div className="basic">
            <div className="basic__box row">
                <h1><i class="fa-solid fa-user"></i> Resume              
                </h1>

               
                <div className="line">



        <div style={{display:"flex",flexWrap:"wrap"}}>

 


                

        <Card style={{ width: '18rem',margin:"2rem" }}>
      <Card.Body>
        <Card.Title>{profile.BasicDetails?.firstName}'s Resume</Card.Title>
        <Card.Link href={url} target='_blank'>Open Resume</Card.Link>
        <p>Change/Upload Resume</p>
        <input type="file" onChange={uploadResumeInput}/>
        <button onClick={uploadResumeHandler}>Upload</button>
      </Card.Body>
    </Card>


    <Card style={{ width: '18rem',margin:"2rem" }}>
    
    <Card.Body>
      <Card.Title>Masters Marksheet</Card.Title>
      <Card.Link href={`http://localhost:8000/${profile.EducationDetails?.masters?.marksheets?.slice(6)}`} target='_blank'>Open Marksheet</Card.Link>
      <p>Change/Upload Resume</p>
      <input type="file" onChange={uploadResumeInput}/>
      <button onClick={uploadmastersHandler}>Upload</button>
    </Card.Body>
  </Card>
    <Card style={{ width: '18rem',margin:"2rem" }}>
    
    <Card.Body>
      <Card.Title>Bachelors Marksheet</Card.Title>
      <Card.Link href={`http://localhost:8000/${profile.EducationDetails?.bachelors?.marksheets?.slice(6)}`} target='_blank'>Open Marksheet</Card.Link>
      <p>Change/Upload Resume</p>
      <input type="file" onChange={uploadResumeInput}/>
      <button onClick={uploadbachelorsHandler}>Upload</button>
    </Card.Body>
  </Card>

    <Card style={{ width: '18rem',margin:"2rem" }}>
    
      <Card.Body>
        <Card.Title>Class X Marksheets</Card.Title>
        <Card.Link href={`http://localhost:8000/${classTen?.marksheets?.slice(6)}`} target='_blank'>Open Marksheet</Card.Link>
        <p>Change/Upload Resume</p>
        <input type="file" onChange={uploadResumeInput}/>
        <button onClick={uploadClassXHandler}>Upload</button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',margin:"2rem" }}>
    
      <Card.Body>
        <Card.Title>Class XII Marksheets</Card.Title>
        <Card.Link href={`http://localhost:8000/${classTwelve?.marksheets?.slice(6)}`} target='_blank'>Open Marksheet</Card.Link>
        <p>Change/Upload Resume</p>
        <input type="file" onChange={uploadResumeInput}/>
        <button onClick={uploadClassXIIHandler}>Upload</button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',margin:"2rem" }}>
    
      <Card.Body>
        <Card.Title>Diploma</Card.Title>
        <Card.Link href={`http://localhost:8000/${classTwelve?.marksheets?.slice(6)}`} target='_blank'>Open Marksheet</Card.Link>
        <p>Change/Upload Resume</p>
        <input type="file" onChange={uploadResumeInput}/>
        <button onClick={uploadClassDiplomaHandler}>Upload</button>
      </Card.Body>
    </Card>


    </div>



                </div>

            </div>

        </div >
    )
}
