const host="http://localhost:8000/";

export const fetchJobs=async()=>{
    try{
        const res=await fetch(`${host}api/student/job/fetchJobs`,{
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
export const getCompanyLogo=async(recruiterId)=>{
    try{
        const res=await fetch(`${host}api/student/job/fetchLogo/${recruiterId}`,{
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