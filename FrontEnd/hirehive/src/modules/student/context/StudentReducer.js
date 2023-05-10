export const StudentReducer=(state,action)=>{
    const {type,payload}=action;

    switch(type){
        case "setJob":
            console.log("Seeting job Data:");
            return{...state,jobs:[...payload]}
        default:
            return state
    }

}