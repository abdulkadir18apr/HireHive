import React from 'react'
import Navbar from './components/Navbar'
import {  useRecruiterContext } from './context/RecruiterContext'
import { Outlet } from 'react-router-dom'
import { getProfile } from './context/apicalls'
import { useEffect } from 'react'

export  function RecruiterDahboard() {
  const {state,dispatch}=useRecruiterContext();

  const setProfile=async()=>{
    const res=await getProfile();
    if(res.success){
      dispatch({type:"setProfile",payload:res.profile})
    }

  }
  useEffect(()=>{
    setProfile();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
 
    </div>
  )
}
