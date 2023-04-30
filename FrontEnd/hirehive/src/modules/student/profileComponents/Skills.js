import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";


export default function Skills() {
    const { profile } = useContext(ProfileContext);
    const { skills, language } = profile;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="basic">
            <UpdateSkill handleClose={handleClose} handleShow={handleShow} show={show} />

            <div className="basic__box row">
                <h1><i class="fa-solid fa-user"></i> Skills
                    <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i class="fa-solid fa-pen-to-square "></i></button></h1>
                <div className="line"></div>
                <div className='about'>
                    {
                        skills.map((skill) => <li>{skill}</li>)
                    }
                </div>
            </div>

            <div className="basic">
                <div className="basic__box row">
                    <h1><i class="fa-solid fa-user"></i> Languages
                        <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i class="fa-solid fa-pen-to-square "></i></button></h1>
                    <div className="line"></div>
                    <div className='about'>
                        {
                            language.map((lang) => <li>{lang}</li>)
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

const UpdateSkill = ({ handleClose, show }) => {


    const { profile, updateSkills } = useContext(ProfileContext);
    const [skills, setSkills] = useState(profile.skills.toString())
    const [languages, setLanguages] = useState(profile.language.toString())
    const addSkills = async () => {
        console.log("Calling.....")
        const skillArr = skills.split(",");
        const languageArr = languages.split(",")
        const bodyObj = { skills: [...skillArr], language: [...languageArr] }
        const res = await updateSkills(bodyObj);
        if (res) {
            console.log("Updated");
            handleClose();
        }
        else {
            alert("Something went wrong...")
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h4 class="modal-title text-center ">Add Technical Skills</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="container overflow-hidden">
                            <div class="row gy-5">

                                <div class="col-12">
                                    <div class="mb-3">
                                        <p>Please enter skills seperated by '<span style={{ color: "red", fontWeight: "800" }}> , </span>' </p>
                                        <label class="form-label">Enter Skills:</label>
                                        <textarea className="form-control" value={skills} onChange={(e) => setSkills(e.target.value)} />
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <p>Please enter Languages seperated by '<span style={{ color: "red", fontWeight: "800" }}> , </span>' </p>
                                        <label class="form-label">Enter Languages:</label>
                                        <textarea className="form-control" value={languages} onChange={(e) => setLanguages(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary mx-3" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addSkills}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}