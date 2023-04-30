import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";

export default function Project() {
    const { profile,deleteProject } = useContext(ProfileContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const projectDeleteHandler=async(id)=>
    {
        const res=await deleteProject(id);
        if(res){
            alert("Project Deleted");
        }

    }

    return (
        <div className="basic">
            <UpdateProject handleClose={handleClose} show={show}/>
            <div className="basic__box row">
                <h1><i class="fa-solid fa-user"></i> Projects
                    <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i class="fa-solid fa-plus "></i></button></h1>
                <div className="line"></div>
                <div className='about'>
                    {
                        profile?.ProjectDetails?.projects.map((project) =>
                        <div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <div>
                                    <p><span>Project Name</span> {project.projectName}</p>
                                    <p><span>Project Link</span> {project.projectLink}</p>
                                    <p><span> Source Code</span> {project.githubRepo}</p>
                                    <p><span> Description</span> {project.description}</p>

                                </div>
                                <button style={{color:"red",paddingRight:"2rem"}} onClick={()=>projectDeleteHandler(project._id)}>Delete</button>
                            </div>
                           
                            <div className="line"></div>
                            </div>
                        )
                    }
                </div>


            </div>

        </div>
    )
}


const UpdateProject=({handleClose,show})=>{

    const[projectInput,setProjectInput]=useState({});
    const {addProject}=useContext(ProfileContext);

    const projectInputHandler=(e)=>{
        setProjectInput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const addProjectHandler=async()=>{
        const res=await addProject(projectInput);
        if(res){
            alert("Project Added Successfully");
            handleClose();
        }
        else{
            alert("Something went wrong...")
        }
        handleClose();
    }
    return(
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h4 class="modal-title text-center ">Add Your Projects </h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div class="modal-body">
                        <form>
                            <div class="mb-3 col-12">
                                <label class="form-label required">Enter Project Title</label>
                                <input type="text" class="form-control" name='projectName' onChange={projectInputHandler}/>
                            </div>
                            <div class="mb-3 col-12">
                                <label class="form-label required">Enter Project Source Code Link</label>
                                <input type="text" class="form-control" name='githubRepo' onChange={projectInputHandler}/>
                            </div>
                            <div class="mb-3 col-12">
                                <label class="form-label required">Project Live Link</label>
                                <input type="text" class="form-control" name='projectLink' onChange={projectInputHandler}/>
                            </div>
                            <div class="mb-3 col-12">
                                <label class="form-label required">Description</label>
                                <textarea  class="form-control" placeholder='project is about....' name='description' onChange={projectInputHandler} />
                            </div>
                        </form>
                    </div>

                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary mx-3" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={addProjectHandler}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}
