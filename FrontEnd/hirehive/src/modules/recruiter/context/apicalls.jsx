
const host="http://localhost:8000/";

export const recruiterLogin=async(credentials)=>{


    try{
        const res=await fetch(`${host}api/recruiter/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"   

                
            },
            body: JSON.stringify(credentials)
        })

        const json=await res.json();
        return json;

    }
    catch(error){
        return {success:false,error}
    }

}


export const recruiterSignUp=async(credentials)=>{
    try{
        const res=await fetch(`${host}api/recruiter/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"   
            },
            body:JSON.stringify(credentials)
        })

        const json=await res.json();
        console.log(res);
        return json;

    }
    catch(error){
        return {success:false,error}
    }

}


export const recruiterVerifyOtp=async(credentials)=>{
    try{
        const res=await fetch(`${host}api/recruiter/auth//recruiterVerify`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"   
            },
            body:JSON.stringify(credentials)
        })

        const json=await res.json();
        return json;
    }
    catch(error){
        return {success:false,error}
    }

}
export const getRecruiter=async()=>{
    try{
        const res=await fetch(`${host}api/recruiter/auth/getrecruiter`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json" ,
                "auth-token":localStorage.getItem('token')  
            },
        })

        const json=await res.json();
        return json;
    }
    catch(error){
        return {success:false,error}
    }

}


export const getProfile=async()=>{
    try{
        const res=await fetch(`${host}api/recruiter/profile/getProfile`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json" ,
                "auth-token":localStorage.getItem('token')  
            },
        })

        const json=await res.json();
        return json;
    }
    catch(error){
        return {success:false,error}
    }

}
export const addProfile=async(profile)=>{
    try{
        const res=await fetch(`${host}api/recruiter/profile/addProfile`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json" ,
                "auth-token":localStorage.getItem('token')  
            },
            body:JSON.stringify(profile)
        })

        const json=await res.json();
        return json;
    }
    catch(error){
        return {success:false,error}
    }

}


export const uploadImage=async(image,type)=>{
    const formData=new FormData();
    formData.append(`${type}`,image);
    let url=""
    if(type==="profileImage"){
        url="uploadProfileImage"
    }
    else{
        url="uploadCompanyLogo"
    }
    try{
        const res=await fetch(`${host}api/recruiter/profile/${url}`,{
            method:"POST",
            headers:{
                "auth-token":localStorage.getItem('token')  
            },
            body:formData
        })

        const json=await res.json();
        console.log(json);
        return json;
    }
    catch(error){
        return {success:false,error}
    }

}