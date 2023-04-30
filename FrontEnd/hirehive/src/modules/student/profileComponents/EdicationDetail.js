import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import ProfileContext from '../../../contexts/profile/ProfileContext'
import "./css/profile.css";
import { Newbutton } from './Newbutton';

export default function EducationDetail() {
    const { profile } = useContext(ProfileContext);
    console.log(profile);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   


    return (
        <div className="education">
            <UpdateEducation handleClose={handleClose} show={show} />
            {!profile.EducationDetails && <Newbutton handleShow={handleShow}/>}
            {profile?.EducationDetails.masters &&

                <div className="basic__box">
                    <h1><i className="fa-solid fa-graduation"></i> Post Graduation
                        <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button>
                    </h1>
                    <div className="line"></div>
                    <div className='about'>
                        <p><span>Course Name</span>{profile?.EducationDetails?.masters.courseName}</p>
                        <p><span>Branch Name</span> {profile?.EducationDetails?.masters.branchName}</p>
                        <p><span>Institute Name</span> {profile?.EducationDetails?.masters.instituteName}</p>
                        <p><span>Percentage</span> {profile?.EducationDetails?.masters.percentage}</p>
                        <p><span>Duration</span> {profile?.EducationDetails?.masters.started?.split("T")[0]}{"   -   "}{profile?.EducationDetails?.masters?.ended?.split("T")[0]}</p>
                    </div>

                </div>} 

            {profile.EducationDetails?.bachelors &&
                <div className="basic__box">
                    <h1><i className="fa-solid fa-graduation"></i>Graduation
                        <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button></h1>
                    <div className="line"></div>
                    <div className='about'>
                        <p><span>Course Name</span>{profile.EducationDetails?.bachelors.courseName}</p>
                        <p><span>Branch Name</span> {profile.EducationDetails?.bachelors.branchName}</p>
                        <p><span>Institute Name</span> {profile.EducationDetails?.bachelors.instituteName}</p>
                        <p><span>Percentage</span> {profile.EducationDetails?.bachelors.percentage}</p>
                        <p><span>Duration</span> {profile.EducationDetails?.bachelors.started?.split("T")[0]}{"  -  "}{profile.EducationDetails?.bachelors.ended?.split("T")[0]}</p>
                    </div>


                </div>}
            {profile.EducationDetails?.classTwelve &&
                <div className="basic__box">
                    <h1><i className="fa-solid fa-graduation"></i>Senior Secondary (XII)
                        <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button></h1>
                    <div className="line"></div>
                    <div className='about'>
                        <p><span>Course Name</span>{profile.EducationDetails?.classTwelve.courseName}</p>
                        <p><span>Branch Name</span> {profile.EducationDetails?.classTwelve.branchName}</p>
                        <p><span>Institute Name</span> {profile.EducationDetails?.classTwelve.instituteName}</p>
                        <p><span>Percentage</span> {profile.EducationDetails?.classTwelve.percentage}</p>
                        <p><span>Duration</span> {profile.EducationDetails?.classTwelve.started?.split("T")[0]}{"  -  "}{profile.EducationDetails?.classTwelve.ended?.split("T")[0]}</p>
                    </div>
                </div>}
            {profile.EducationDetails?.classTen &&
                <div className="basic__box">
                    <h1><i className="fa-solid fa-graduation"></i>Secondary (X)
                        <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button></h1>
                    <div className="line"></div>
                    <div className='about'>
                        <p><span>Course Name</span>{profile.EducationDetails?.classTen.courseName}</p>
                        <p><span>Branch Name</span> {profile.EducationDetails?.classTen.branchName}</p>
                        <p><span>Institute Name</span> {profile.EducationDetails?.classTen.instituteName}</p>
                        <p><span>Percentage</span> {profile.EducationDetails?.classTen.percentage}</p>
                        <p><span>Duration</span> {profile.EducationDetails?.classTen.started?.split("T")[0]}{"  -  "}{profile.EducationDetails?.classTen.ended?.split("T")[0]}</p>
                    </div>
                </div>}
             {profile.EducationDetails?.diploma &&
                <div className="basic__box">
                    <h1><i className="fa-solid fa-graduation"></i>Diploma
                        <button style={{ width: "3rem", backgroundColor: "yellow", borderRadius: "10px", textAlign: 'center', fontWeight: "500", padding: "3px", fontSize: "16px" }} onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button></h1>
                    <div className="line"></div>
                    <div className='about'>
                        <p><span>Course Name</span>{profile.EducationDetails?.diploma.courseName}</p>
                        <p><span>Branch Name</span> {profile.EducationDetails?.diploma.branchName}</p>
                        <p><span>Institute Name</span> {profile.EducationDetails?.diploma.instituteName}</p>
                        <p><span>Percentage</span> {profile.EducationDetails?.diploma.percentage}</p>
                        <p><span>Duration</span> {profile.EducationDetails?.diploma.started}{"  -  "}{profile.EducationDetails?.diploma.ended}</p>
                    </div>
                </div>}
        </div>
    )
}


const UpdateEducation=({handleClose,show})=>{

    const[form,setForms]=useState("");
    const {profile,updateEducation}=useContext(ProfileContext);
 


    const [education,setEducation]=useState({
        masters:{...profile?.EducationDetails.masters},
        bachelors:{...profile?.EducationDetails.bachelors},
        classTwelve:{...profile?.EducationDetails.classTwelve},
        classTen:{...profile?.EducationDetails.classTen},
        diploma:{...profile?.EducationDetails.diploma}
    });


    const updateEducationHandler=async()=>{
        console.log("sybmitting...",education);
        const res= await updateEducation({...education})
        if(res){
            alert("Education Details Updated");
            handleClose();
        }

    }



    return(
        <>
        <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
            <Modal.Title>
            <h4 className="modal-title text-center ">Add Your Education Details</h4>
                
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>   
            <p style={{color:"red",textAlign:"center",marginBottom:"2rem"}}>Please Save All the Feild before Clicking a submit Button</p>

                <nav  style={{display:"flex",listStyle:"none",justifyContent:"space-evenly"}}>
                    <li><button className={`modalBtn ${form==='Masters' && "active"}`} onClick={()=>setForms("Masters")}>Masters</button></li>
                    <li><button className={`modalBtn ${form==='Bachelors' && "active"}`}onClick={()=>setForms("Bachelors")}>Bachelors</button></li>
                    <li><button className={`modalBtn ${form==='Twelve' && "active"}`} onClick={()=>setForms("Twelve")}>Class XII</button></li>
                    <li><button className={`modalBtn ${form==='Ten' && "active"}`} onClick={()=>setForms("Ten")}>Class X</button></li>
                    <li><button className={`modalBtn ${form==='Diploma' && "active"}`} onClick={()=>setForms("Diploma")}>Diploma</button></li>
                </nav>
                {form==="Masters" &&<MastersForm program="Masters Degree" education={education} setEducation={setEducation}/>}
                {form==="Bachelors" &&<MastersForm program="Bachelors Degree" education={education} setEducation={setEducation} />}
                {form==="Twelve" &&<TwelveForm standard="CLASS 12th" education={education}  setEducation={setEducation}/>}
                {form==="Ten" &&<TwelveForm standard="CLASS 10th" education={education} setEducation={setEducation}/>}
                {form==="Diploma" &&<MastersForm  program="Diploma" education={education} setEducation={setEducation} />}


        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary mx-3" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={updateEducationHandler}>
               Submit
            </Button>
        </Modal.Footer>
    </Modal>
    </>


    )

}

const MastersForm=({program,education,setEducation})=>{


    const {profile}=useContext(ProfileContext)
    const [programInput,setProgramInput]=useState(program==="Masters Degree"?profile?.EducationDetails.masters:program==="Bachelors Degree"?profile?.EducationDetails.bachelors:profile?.EducationDetails.diploma)


    const schoolInputHandler=(e)=>{
        setProgramInput(({...programInput,[e.target.name]:e.target.value}));
    }
    const schoolSaveHandler=()=>{
        if(program==="Masters Degree"){
            const masters={...programInput}
            setEducation(({...education,masters:masters}))
        }
        else if(program==="Bachelors Degree"){
            const bachelors={...programInput}
            setEducation(({...education,bachelors:bachelors}))
            
        }  
        else{
            const diploma={...programInput}
            setEducation(({...education,diploma:diploma}))
        }      
    }
    return(
        <form>
        <div className="container overflow-hidden">
            <div className="row gy-5">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Program/{program}</label>
                        <input type="text" className="form-control" value={programInput?.courseName} name="courseName" onChange={schoolInputHandler} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Major/Branch</label>
                        <input type="text" className="form-control" value={programInput?.branchName} name='branchName'  onChange={schoolInputHandler} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required"  >Select Institue Name</label>
                        <input type="text" className="form-control" name="instituteName"  value={programInput?.instituteName}  onChange={schoolInputHandler} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required" >Institute Roll No.</label>
                        <input type="number" className="form-control" value={programInput?.rollNumber} name="rollNumber"  onChange={schoolInputHandler}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required"  >Select Course Start Date</label>
                        <input type="date" className="form-control" value={programInput?.started} name="started"  onChange={schoolInputHandler}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required" >Select Course End Date</label>
                        <input type="date" className="form-control" value={programInput?.ended} name="ended"  onChange={schoolInputHandler}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Select Passout Batch</label>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required" value={programInput?.percentage} name="percentage"  onChange={schoolInputHandler}>Percentage Equivalent (in %)</label>
                        <input type="number" min="1" max="100" step="0.01" id="myPercent"
                            className="form-control"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                    <Button  className="form-control" onClick={schoolSaveHandler}> Save </Button>
                    </div>
                </div>
            </div>
        </div>

    </form>
    )
}

const TwelveForm=({standard,education,setEducation})=>{

    const {profile}=useContext(ProfileContext);

    const [classTwelveInput,setClassTwelveInput]=useState(standard==="CLASS 12th"?profile?.EducationDetails?.classTwelve:profile?.EducationDetails?.classTen);


    const schoolInputHandler=(e)=>{
        setClassTwelveInput(({...classTwelveInput,[e.target.name]:e.target.value}))
    }
    const schoolSaveHandler=()=>{
        if(standard==="CLASS 12th"){
           const classTwelve={...classTwelveInput}
           setEducation({...education,classTwelve:classTwelve})
           
        }
          
        else{
            const classTen={...classTwelveInput}
            setEducation({...education,classTen:classTen})
        }        
    }
    return(
        <form>
        <div className="container overflow-hidden">
            <div className="row gy-5">
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Select Program/Degree/Certificate</label>
                        <input type="text" className="form-control" readOnly="readonly" value={standard}  />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">School/Institute Name</label>
                        <input type="text" className="form-control" value={classTwelveInput?.instituteName} onChange={schoolInputHandler} name="instituteName"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Enter Board/University</label>
                        <input type="text" className="form-control"  />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Enter Branch/Specialization</label>
                        <input type="number" className="form-control" value={classTwelveInput?.branchName} onChange={schoolInputHandler}  name="branchName"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Select Course Start Date</label>
                        <input type="date" className="form-control" value={classTwelveInput?.started} onChange={schoolInputHandler} name="started"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Select Course End Date</label>
                        <input type="date" className="form-control" value={classTwelveInput?.ended} name="ended" onChange={schoolInputHandler}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Select Education Type</label>
                        <select className="form-control">
                            <option defaultValue="full time">Full Time</option>
                            <option defaultValue="part time">Part Time</option>
                            <option defaultValue="correspondence">Correspondence</option>
                            <option defaultValue="others">Others</option>
                          </select>
                        
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label required">Score in Percentage</label>
                        <input type="number" min="1" max="100" step="0.01" id="myPercent"
                         className="form-control" defaultValue={classTwelveInput?.percentage} name="pecentage" onChange={schoolInputHandler} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                       
                        <Button  className="form-control" onClick={schoolSaveHandler}> Save </Button>
                         
                    </div>
                </div>
            </div>
           
        </div>

    </form>
    )
}