export const RecruiterReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case "setRecruiter":
            console.log("updating....");
            return {...state,recruiter:payload}
        case "setProfile":
            return {...state,profile:{...payload}}
        default:
            console.log("Default");
            return state
    }
}