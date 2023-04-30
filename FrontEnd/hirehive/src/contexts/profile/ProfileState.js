import ProfileContext from "./ProfileContext";
import { useState } from "react";

import React from 'react'
import { json } from "react-router-dom";
function ProfileState(props) {
    const profileObj = {
        BasicDetails: {
            firstName: "",
            lastName: "",
            enrollment: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            batch: "",
            currentAddress: {
                houseNumber: "",
                street: "",
                city: "",
                pincode: "",
                state: ""
            },
            parmanentAddress: {
                houseNumber: "",
                street: "",
                city: "",
                pincode: "",
                state: ""
            },
            contact: [],


        },
        EducationDetails: {
            masters: {
                courseName: "",
                branchName: "",
                instituteName: "",
                rollNumber: "",
                started: "",
                ended: "",
                pecentage: ""
            },
            bachelors: {
                courseName: "",
                branchName: "",
                instituteName: "",
                rollNumber: "",
                started: "",
                ended: "",
                pecentage: ""
            },
            classTwelve: {
                courseName: "",
                branchName: "",
                instituteName: "",
                rollNumber: "",
                started: "",
                ended: "",
                pecentage: ""
            },
            classTen: {
                courseName: "",
                branchName: "",
                instituteName: "",
                rollNumber: "",
                started: "",
                ended: "",
                pecentage: ""
            },
            diploma: {
                courseName: "",
                branchName: "",
                instituteName: "",
                rollNumber: "",
                started: "",
                ended: "",
                pecentage: ""
            }
        },
        skills: [],
        language: [],
        IntershipDetails: { interships: [] },
        ProjectDetails: { projects: [] },
        CertificationDetails: { Certificates: [] },
        profileImage: "",
        resume: ""


    }
    const [profile, setProfile] = useState(profileObj);
    const [profilePic, setProfilePic] = useState("");
    const [fullName, setFullName] = useState("");
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
        if (json.success === false) {
            setFullName("");
            setProfilePic("");
            setProfile(profileObj);
            return false;
        }
        else {
            setProfile(json);
            setProfilePic(json.profileImage);
            setFullName(json.BasicDetails.firstName + json.BasicDetails.lastName);
            return true;

        }

    }
    const updateBasicDetails = async (details) => {
        const res = await fetch(`${host}api/student/profile/setbasicdetails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem("token")
            },
            body: JSON.stringify({ ...details }),
        });
        const json = await res.json();
        if (json.success) {

            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log(res);
            }
        }
        else {
            console.log(json);
            return false;
        }
    }

    const uploadProfileImage = async (profileImage) => {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        const res = await fetch(`${host}api/student/profile/profilepicture`, {
            method: "POST",
            headers: {
                "auth-Token": localStorage.getItem("token")
            },
            body: formData,
        });
        const json = await res.json();
        if (!json.success) {
            console.log(json)
            return false
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log(res)

                return false;
            }

        }


    }
    const uploadResume = async (resume) => {
        const formData = new FormData();
        formData.append('resume', resume);
        const res = await fetch(`${host}api/student/profile/resume`, {
            method: "POST",
            headers: {
                "auth-Token": localStorage.getItem("token")
            },
            body: formData,
        });
        const json = await res.json();
        if (!json.success) {
            console.log(json)
            return false
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log(res)

                return false;
            }

        }


    }
    const uploadMarksheets = async (marksheet,program) => {
        console.log(marksheet);
        const formData = new FormData();
        formData.append('marksheet[]', marksheet);
        console.log(formData);
        const res = await fetch(`${host}api/student/profile/marksheet/${program}`, {
            method: "POST",
            headers: {
                "auth-Token": localStorage.getItem("token")
            },
            body: formData,
        });
        const json = await res.json();
        if (!json.success) {
            console.log(json)
            return false
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log(res)

                return false;
            }

        }
    }
    const updateSkills = async (bodyObj) => {
        const response = await fetch(`${host}api/student/profile/skills`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify(bodyObj)
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }

    }
    const updateCertificate = async (certificates) => {
        const bodyObj = { Certificates: [...certificates] };
        const response = await fetch(`${host}api/student/profile/certificationdetails`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify(bodyObj)
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }


    }

    const deleteCertificate=async(bodyObj)=>{
        const response = await fetch(`${host}api/student/profile/deleteCertificationdetails`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify(bodyObj)
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }

    }

    const addIntership=async(intership)=>{
        console.log("Calling")
        const response=await fetch(`${host}api/student/profile/intershipdetails`,{
            method:"PUT",
            
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify(intership)
        });
        const json = await response.json();

        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }

    }
    const deleteIntership=async(id)=>{
      
        const response=await fetch(`${host}api/student/profile/deleteIntershipdetails`,{
            method:"DELETE",
            
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({id})
        });
        const json = await response.json();

        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }

    }
    const addProject=async(project)=>{
      
        const response=await fetch(`${host}api/student/profile/projectdetails`,{
            method:"PUT",
            
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify(project)
        });
        const json = await response.json();

        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }

    }
    const deleteProject=async(id)=>{
      
        const response=await fetch(`${host}api/student/profile/deleteProjectdetails`,{
            method:"DELETE",
            
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({id})
        });
        const json = await response.json();

        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }

    }

    const updateEducation=async(bodyObj)=>{
        const response=await fetch(`${host}api/student/profile/educationdetails`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify(bodyObj)
        });
        const json=await response.json();
        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }
    }
    const updateAddressAndContact=async(bodyObj)=>{
        const response=await fetch(`${host}api/student/profile/updateBasicDetails`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify(bodyObj)
        });
        const json=await response.json();
        if (!json.success) {
            alert("Please Try Again")
        }
        else {
            const res = await getStudentProfile();
            if (res) {
                
                return true;
            }
            else {
                console.log("Something went Wrong in fetching Details....")
                return false;
            }
        }
    }

    






    return (
        <ProfileContext.Provider value={{ profile, profilePic, fullName, updateCertificate, getStudentProfile, updateBasicDetails, uploadProfileImage, updateSkills,deleteCertificate,addIntership,deleteIntership,deleteProject,addProject,updateEducation,updateAddressAndContact,uploadResume,uploadMarksheets}} >
            {props.children}
        </ProfileContext.Provider>
    )
}
export default ProfileState;

