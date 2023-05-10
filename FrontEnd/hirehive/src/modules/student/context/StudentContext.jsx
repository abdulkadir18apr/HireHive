import { createContext, useContext, useReducer } from "react";
import { StudentReducer } from "./StudentReducer";


export const StudentContext=createContext();

export const StudentContextProvider=({children})=>{

    const [state,dispatch]=useReducer(StudentReducer,{
        jobs:[]
    })



    return(
        <StudentContext.Provider value={{state,dispatch}}>
            {children}
        </StudentContext.Provider>
    )
}

export const useStudentContext=()=>useContext(StudentContext);