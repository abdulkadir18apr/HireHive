import { createContext, useContext, useReducer } from "react";
import { RecruiterReducer } from "./RecruiterReducer";

export const RecruiterContext=createContext();

export const RecruiterContextProvider=({children})=>{

    const [state,dispatch]=useReducer(RecruiterReducer,{
        recruiter:{},
        profile:{}
    })


    const setRecruiter=(recruiter)=>{
        dispatch(({type:"setRecruiter",payload:recruiter}))
    }


    
    
    return(
        <RecruiterContext.Provider value={{state,setRecruiter,dispatch}}>
            {children}
        </RecruiterContext.Provider>
    )
}
export const useRecruiterContext=()=>useContext(RecruiterContext);