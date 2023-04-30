import React, { useContext,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";

export default function Intership() {
    const { profile,deleteIntership } = useContext(ProfileContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteInternshipHandler=async(_id)=>{
        const res=await deleteIntership(_id);
        if(res){
            alert("Intership Deleted");
        }
    }

    return (
        <div className="basic">
            <UpdateIntership handleClose={handleClose} show={show}/>
            <div className="basic__box row">
                <h1><i className="fa-solid fa-user"></i> IntenShips/Work Experience
                    <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i className="fa-solid fa-plus "></i></button></h1>
                <div className="line"></div>
                <div className='about'>
                    {
                        profile?.InternshipDetails?.internships.map((internships) =>
                        <div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>

                            <div>
                                <p><span>Company Name</span> {internships.companyName}</p>
                                <p><span>Position</span> {internships.jobTitle}</p>
                                <p><span>Description</span> {internships.workDetails}</p>
                                <p><span>Duration </span> {internships.startDate.split("T")[0]}{"   -   "}{internships.endDate.split("T")[0]}</p>
                            </div>
                            <button style={{color:"red",marginRight:"2rem"}} onClick={()=>deleteInternshipHandler(internships._id)}>Delete</button>
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



const UpdateIntership=({handleClose,show})=>{
    
    let currDate=new Date();
    currDate=currDate.toISOString().split("T")[0]

    const [internshipsDetails,setIntershipDetails]=useState({});
    const [checkbox,setCheckbox]=useState("");
    const {addIntership}=useContext(ProfileContext);
   



    const inputHandler=(e)=>{
        if(e.target.name==="endDate" && checkbox!==""){
            e.target.value=checkbox
;        }
        setIntershipDetails((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const addInterShipHandler=async()=>{
        const res=await addIntership(internshipsDetails);

        if(res){
            handleClose();
        }
    }


    return(
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h4 className="modal-title text-center ">Add Intership/Work Experience</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                            <div className="container overflow-hidden">
                                <div className="row gy-1">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label required">Enter Company Name</label>
                                            <input type="text" className="form-control" name="companyName" onChange={inputHandler}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label required">Enter Job Title</label>
                                            <input type="text" className="form-control" name="jobTitle" onChange={inputHandler}/>
                                        </div>
                                    </div>
                                  
                              
                                    <div className="col-7">
                                        <div className="mb-3">
                                            <label className="form-label required">Select Start Date</label>
                                            <input type="date" className="form-control" name="startDate" onChange={inputHandler}/>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="mb-3">
                                            <label className="form-label required">Select End Date</label>
                                            <input type="date" className="form-control" defaultChecked={checkbox}
                                            disabled={checkbox===""?false:true} name="endDate" onChange={inputHandler}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label required">Description</label>
                                            <textarea className="form-control" name="workDetails" onChange={inputHandler}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <input type="checkbox" className='mx-1' onChange={(e)=>e.target.checked?setCheckbox(currDate):setCheckbox("")}/>
                                            <label> I currently work here</label><br/>
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
                <Button variant="primary" onClick={addInterShipHandler}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>

    )

}