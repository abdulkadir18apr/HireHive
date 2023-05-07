
import { useState } from "react";
import { useRecruiterContext } from "../context/RecruiterContext";
import "./profile.css"
import { getProfile, uploadImage } from "../context/apicalls";


export const Profile=()=>{

  const host="http://localhost:8000"

  const {state,dispatch}=useRecruiterContext();
  const {profile}=state;
  const companyLogo=profile.companyLogo?`${host}${profile.companyLogo.slice(6)}`:"https://picsum.photos/200";
  const profilePic=profile.profileImage?`${host}${profile.profileImage.slice(6)}`:"https://picsum.photos/200";
  console.log(companyLogo)


  const uploadPicture=async(e)=>{

    const res=await uploadImage(e.target.files[0],e.target.name);
    if(res.success){
      const response=await getProfile();
      if(response.success){
        dispatch({type:"setProfile",payload:response.profile});
        alert("profile pic updated");
      }

    }
    else{
      alert("Something went wrong....")
    }

  }

    return(
       <div className="profile_container">
        <div className="profile company">
          <h1>About The Organization</h1>

          <div className="wrapper" >
                <div className="profile">
                    <img className="logo" src={companyLogo} alt="profile_picture" />
                    <div className="round">
                        <input type="file" onChange={uploadPicture} name="companyLogo" />
                        <i className="fa-solid fa-camera"></i>
                </div>
              </div>
            </div>
          <p>
            {profile?.description}
          </p>

        </div>
        <div className="profile recruiter">
        <div className="wrapper" >
                <div className="profile">
                    <img className="logo" src={profilePic} alt="profile_picture" />
                    <div className="round">
                        <input type="file" onChange={uploadPicture}  name="profileImage"/>
                        <i className="fa-solid fa-camera"></i>
                </div>
              </div>
            </div>
          <h1>{`${profile.firstName} ${profile?.lastName}`}</h1>
          <h2>{profile?.position} at {profile?.companyName}</h2>
          <h2>Contact</h2>
          <p><i class="fa-solid fa-envelope"></i> <a href="#" >{profile?.email}</a></p>
          <p><i class="fa-solid fa-phone"></i>{profile?.contact}</p>
        </div>
       </div>
    
    )
}