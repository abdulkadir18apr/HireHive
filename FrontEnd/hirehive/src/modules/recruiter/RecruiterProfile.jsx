import React from 'react'
import { Profile } from './components/Profile'
import { useRecruiterContext } from './context/RecruiterContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { addProfile } from './context/apicalls';
import { useRef } from 'react';





export  function RecruiterProfile() {
  const {state}=useRecruiterContext();

  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <>
    {Object.keys(state.profile).length===0 && <div style={{position:"absolute",bottom:"50%",left:"45%"}}>
    
        <button onClick={handleShow} style={{backgroundColor:"#082F49",color:"#EAB308",width:"10rem",padding:"10px",fontWeight:"800"}}>Add Profile </button>  

        <AddProfileModal show={show} handleClose={handleClose}/>

      </div>}

      {
        Object.keys(state.profile).length>0 && <Profile/>
      }

    </>
  )
}


const AddProfileModal=({handleClose,show})=>{

  const [profileInput,setProfileInput]=useState({});
  const descriptionRef=useRef(null)
  const {dispatch}=useRecruiterContext()


  const profileInputHandler=(e)=>{
    setProfileInput((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const addProfileClickHandler=async()=>{
    console.log(profileInput);
    const description=descriptionRef.current.value;
    const profile={...profileInput,description}
    const res=await addProfile(profile);
    if(res.success){
      dispatch({type:"setProfile",payload:res.profile});
      alert("profile updated");
    }
  }
    

  return(
      <>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title><h4 className="modal-title text-center ">Add Profile</h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" onChange={profileInputHandler} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" onChange={profileInputHandler} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email"   name="email" onChange={profileInputHandler} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" name="contact" onChange={profileInputHandler} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="position" onChange={profileInputHandler} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Enter company name" name="companyName" onChange={profileInputHandler} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Description About Organization</Form.Label>
                <Form.Control as="textarea" ref={descriptionRef} name="description" rows={4}  cols={48}/>
              </Form.Group>
            </Col>
           
          </Row>


          </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary mx-3" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={addProfileClickHandler} >
                  Save Changes
              </Button>
          </Modal.Footer>
      </Modal>
  </>

  )

}