import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";

export default function Certificate() {
    const { profile,deleteCertificate} = useContext(ProfileContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteCertificatehandler = async(link) => {
        const bodyObj={certificateLink:link}
        const res=await deleteCertificate(bodyObj)
        if(res){
            alert("Certificate Deleted");
        }
        else{
            console.log("Something went Wrong")
        }
    }


    return (
        <div className="basic">
            <UpdateCertificate handleClose={handleClose} show={show} />
            <div className="basic__box row">
                <h1><i class="fa-solid fa-user"></i> Certifications
                    <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i class="fa-solid fa-plus "></i></button></h1>
                <div className="line"></div>
                <div className='about'>
                    {
                        profile?.CertificationDetails?.Certificates.map((certificate) =>
                            <div>
                                <div style={{display:"flex",flexDirection:"row",gap:"60%"}}>
                                <div>
                                    <p><span>Cetificate Name</span>{certificate.certificateName}</p>

                                    <p><span>Cetificate Link</span> {certificate.certificateLink}</p>
                                </div>
                                <div>
                                <button style={{ position: 'relative', left: "90%", color: "red", backgroundColor: "lightgreen", padding: "05px", borderRadius: "10px",marginRight:"0rem" }} onClick={()=>deleteCertificatehandler(certificate.certificateLink)}>Delete</button>

                                </div>
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


const UpdateCertificate = ({ handleClose, show }) => {
    const { profile, updateCertificate } = useContext(ProfileContext);
    const [certificate, setCertificate] = useState({ certificateName: "", certificateLink: "" });


    const updateCertificateHandler = async () => {
        let newCertificates = profile.CertificationDetails;
        console.log(newCertificates)
        if (newCertificates === null) {
            newCertificates = { Certificates: [certificate] }
        }
        else {
            newCertificates = { Certificates: [...newCertificates.Certificates, certificate] }
            console.log(newCertificates);
        }
        const res = await updateCertificate(newCertificates.Certificates);
        console.log(res);
        if (res) {
            handleClose();
            alert("Certificate Added");
        }
        else {
            handleClose();
            alert("Something went Wrong");
        }

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h4 class="modal-title text-center ">Add Certification Details</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="mb-3">
                            <label class="form-label required">Enter Certification Name</label>
                            <input type="text" class="form-control" onChange={(e) => setCertificate({ ...certificate, certificateName: e.target.value })} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Enter Cetification Link</label>
                            <input type="text" class="form-control" onChange={(e) => setCertificate({ ...certificate, certificateLink: e.target.value })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary mx-3" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateCertificateHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )




}
