import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './profileComponents/Sidebar'
import ProfileContext from '../../contexts/profile/ProfileContext'
import BasicDetail from './profileComponents/BasicDetail'
import EducationDetail from './profileComponents/EdicationDetail'
import { useParams } from 'react-router-dom'
import Skills from './profileComponents/Skills'
import Project from './profileComponents/Project'
import Intership from './profileComponents/Intership'
import Certificate from './profileComponents/Certificate'
import Resume from './profileComponents/Resume'
import { AddProfile } from './profileComponents/AddProfile'


export default function Profile() {
    const { profile, getStudentProfile } = useContext(ProfileContext);

    const { id } = useParams();

    return (
        <div style={{ display: "flex" }} >

            <Sidebar/>
            {!id && <BasicDetail />}
            {id === 'basic' && <BasicDetail />}   
            {id === 'education' && <EducationDetail />}
            {id === 'skills' && <Skills />}
            {id === 'project' && <Project />}
            {id === 'intership' && <Intership />}
            {id === 'certificate' && <Certificate />}
            {id === 'resume' && <Resume />}

        </div>
    )
}
