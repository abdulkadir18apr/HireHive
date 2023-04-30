import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";

export default function BasicDetail() {
    const { profile } = useContext(ProfileContext);
    const { BasicDetails: { firstName, lastName, email, enrollment, gender, batch, currentAddress, contact } } = profile;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="basic">
            <UpdateAddress handleClose={handleClose} show={show}/>
            <div className="basic__box row">

                <h1><i class="fa-solid fa-user"></i> About 
                </h1>


                <div className="line"></div>
                <div className='about'>
                    <p><span>Name</span> {firstName}  {lastName}</p>
                    <p><span>Email</span> {email}</p>
                    <p><span>Enrollment No.</span> {enrollment}</p>
                    <p><span>Gender</span> {gender}</p>
                    <p><span>Batch</span> {batch}</p>
                </div>


            </div>
            <div className="basic__box">
                <h1><i class="fa-solid fa-location-dot"></i> Address Details
                    <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i class="fa-solid fa-pen-to-square " ></i></button>
                </h1>



                <div className="line"></div>
                <div className="address">
                    <div className="currentAddress">
                        <h3>Current Address</h3>
                        <p><span>House No.</span> {currentAddress.houseNumber}</p>
                        <p><span>Street</span> {currentAddress.street}</p>
                        <p><span>City</span> {currentAddress.city}</p>
                        <p><span>State</span> {currentAddress.state}</p>
                        <p><span>Pin-Code</span> {currentAddress.pincode}</p>
                    </div>
                    <div className="permanentAddress">
                        <h3>Current Address</h3>
                        <p><span>House No.</span> {currentAddress.houseNumber}</p>
                        <p><span>Street</span> {currentAddress.street}</p>
                        <p><span>City</span> {currentAddress.city}</p>
                        <p><span>State</span> {currentAddress.state}</p>
                        <p><span>Pin-Code</span> {currentAddress.pinCode}</p>
                    </div>

                </div>
            </div>
            <div className="basic__box">
                <h1><i class="fa-solid fa-mobile"></i>Contact Details
                    <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i class="fa-solid fa-pen-to-square "></i></button></h1>
                <div className="line"></div>
                <div className='contact'>
                    <p><span>Primary Contact No.</span> {contact[0]}</p>
                    <p><span>Alternate Contact NO.</span> {contact[1]}</p>
                    <p><span>Email</span> {email}</p>


                </div>




            </div>
        </div>
    )
}


const UpdateAddress = ({ handleClose, show }) => {


    const { profile, updateAddressAndContact} = useContext(ProfileContext);

    const {currentAddress,permanentAddress,contact}=profile?.BasicDetails;
    const [currentInput,setCurrentInput]=useState(currentAddress)
    const [PermanentInput,setPermanentInput]=useState(permanentAddress);
    const [contactInput,setContactInput]=useState({primary:contact[0],secondary:contact[1]});


    const permanentChange=(e)=>{
        setPermanentInput({...PermanentInput,[e.target.name]:e.target.value})
        
    }

    const currentChange=(e)=>{
        setCurrentInput({...currentInput,[e.target.name]:e.target.value});
    }
    const contactChange=(e)=>{
        setContactInput({...contactInput,[e.target.name]:e.target.value})
    }


    const updateAddressHandler=async()=>{
        const bodyObj={...profile.BasicDetails, currentAddress:currentInput,permanentAddress:PermanentInput,contact:[contactInput.primary,contactInput.secondary]};
        const res=await updateAddressAndContact(bodyObj);
        if(res){
            handleClose();
            alert("Address Details Updated");
        }
        
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h4 class="modal-title text-center ">Add Address Details</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                    <div>
                        <h1 style={{color:"red"}}>Current Address</h1>
                        <div class="mb-3">
                                <label class="form-label required">House No.</label>
                                <input type="text" class="form-control" name="houseNumber" value={currentInput?.houseNumber} onChange={currentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Street</label>
                                <input type="text" class="form-control"  name="street" value={currentInput?.street} onChange={currentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">City</label>
                                <input type="text" class="form-control" name="city" value={currentInput?.city} onChange={currentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">State</label>
                                <input type="text" class="form-control" name="state" value={currentInput?.state} onChange={currentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Pincode</label>
                                <input type="text" class="form-control" name="pincode" value={currentInput?.pincode} onChange={currentChange}/>
                            </div>

                    </div>
                    <div>
                        <h1 style={{color:"red"}}>Permanent Address</h1>
                        <div class="mb-3">
                                <label class="form-label required">House No.</label>
                                <input type="text" class="form-control" name="street" value={PermanentInput?.street} onChange={permanentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Street</label>
                                <input type="text" class="form-control" name="houseNumber" value={PermanentInput?.houseNumber} onChange={permanentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">City</label>
                                <input type="text" class="form-control" name="city" value={PermanentInput?.city} onChange={permanentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">State</label>
                                <input type="text" class="form-control" name="state" value={PermanentInput?.state} onChange={permanentChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Pincode</label>
                                <input type="text" class="form-control" name="pincode" value={PermanentInput?.pincode} onChange={permanentChange}/>
                            </div>
                         

                    </div>
                    <div>
                    <div class="mb-3">
                                <label class="form-label">Primary Contact</label>
                                <input type="text" class="form-control" name="primary" value={contactInput.primary} onChange={contactChange}/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Secondary Contact</label>
                                <input type="text" class="form-control" name="secondary" value={contactInput.secondary} onChange={contactChange}/>
                            </div>
                    </div>
            
                           
                        </form>
                 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary mx-3" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateAddressHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
