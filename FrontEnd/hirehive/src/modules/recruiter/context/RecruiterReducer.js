export const RecruiterReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case "setRecruiter":
            console.log("seting Recruiter....");
            return {...state,recruiter:payload}
        case "setProfile":
            console.log("Setting Profile....")
            return {...state,profile:{...payload}}
        case "setJob":
            console.log("Seting Jovbs");
            return {...state,jobs:[...payload]}
        case "logout":
            return {recruiter:[],profile:[],jobs:[]}
        default:
            console.log("Default");
            return state
    }
}