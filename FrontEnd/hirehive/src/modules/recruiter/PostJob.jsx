import React, { useRef, useState } from 'react'
import "./css/postjob.css"
import { addJob, fetchJob, uploadJobDescription } from './context/apicalls';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecruiterContext } from './context/RecruiterContext';

export  function PostJob() {
    const {state,dispatch}=useRecruiterContext()
    const [inputList,setInputList]=useState([]);
    const [roundCount,setRoundCount]=useState(0);
    const [jobInput,setJobInput]=useState({employementType:"Internship",modeOfProcess:"online"});
    const [show, setShow] = useState(false);
    const[jobId,setJobId]=useState("");
    const [addJobBtn,setAddJobBtn]=useState(true);

    const handleClose = () => setShow(false);

    const timelineClickHandler=()=>{
        setInputList(Array(roundCount).fill({roundName:"",date:"",description:""}));
    }
    const inputChangeHandler=(e)=>{
        setJobInput((Prev)=>({...Prev,[e.target.name]:e.target.value}));


    }

    const saveClickHandler=async(e)=>{
        console.log(inputList);
        setJobInput((prev)=>({...prev,timeline:[...inputList],rounds:roundCount}));
        setAddJobBtn(false);

    }

    const addJobClickHandler=async(e)=>{

        console.log("Calling")

        const res = await addJob(jobInput)
        if(res.success){
            setJobId(res.job._id);
            alert("Job Added Succefully");
            const resp=await fetchJob();
            if(resp.success){
                dispatch({type:"setJob",payload:resp.jobs})
                
            }
            setShow(true);
            setInputList([]);
            setJobInput({});
            setAddJobBtn(true);
        }
        else{
            alert("Please Try again");
        }
    }

    const timeLineChangeHandler=(e,index)=>{
          
         

        const newinputList=[...inputList];
        const obj={...newinputList[index]};
        obj[e.target.name]=e.target.value;
        newinputList[index]={...obj};
        setInputList(newinputList);
    }

 
  return (
    <div className='jobpost'>
        <UploadDocument handleClose={handleClose} show={show} jobId={jobId} />        
        <div className="header">
        <h2>Ready to tap into a pool of exceptional talent? Get ready to post your job opportunity and discover the perfect candidate for your organization!</h2>

        </div>
        <div className="content">
            <ol>
                <p>Simply follow these Step to make your job post live!!</p>
                <li>1.Add some Basic information about jobs</li>
                <li>2.Add process and timeline of recruitement drive</li>
                <li>3.upload Job description in a pdf file and give brief description about the Job</li>
            </ol>
        
        </div>
        <div className="form">
            <h2>Add Job Details</h2>
            <form>
                <label>
                    Position: <input type="text" name="position" id="" value={jobInput?.position} onChange={(e)=>inputChangeHandler(e)} />
                </label>
                <label>
                    Company Name: <input type="text" name="companyName"  value={jobInput?.companyName} id="" onChange={(e)=>inputChangeHandler(e)}/>
                </label>
                <label>
                   Qualification: <input type="text" name="qualification" id="" value={jobInput?.qualification} onChange={(e)=>inputChangeHandler(e)}/>
                </label>
                <label>
                   Skills Required: <input type="text" name="skills" id="" value={jobInput?.skills} onChange={(e)=>inputChangeHandler(e)}/>
                </label>
                <label>
                   Percentage Critera: <input type="text" name="cuttoff" id="" value={jobInput?.cuttoff} onChange={(e)=>inputChangeHandler(e)} />
                </label>
                <label>
                   Salaray Range: <input type="text" name="salary" id=""  value={jobInput?.salary} onChange={(e)=>inputChangeHandler(e)} />
                </label>
    
            </form>
        
   
        </div>
        <div className="timeline">
            <div className='inputs'>
                <label htmlFor="">No. of Rounds:
                <input type="number" name="rounds"  onChange={(e)=>setRoundCount(Number(e.target.value))}   id="" />
                </label>
                <label>Employement Type:
                    <select name="employementType" defaultValue={"select"}  onChange={(e)=>inputChangeHandler(e)}   >
                        <option value="intership">Intership</option>
                        <option value="fullTime">Full Time</option>
                        <option value="partTime">Part Time</option>
                    </select>
                </label>
                <label>Mode Of Process 
                    <select name="modeOfProcess"  onChange={(e)=>inputChangeHandler(e)} >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>   
                    </select>
                </label>
            </div>
            <button onClick={timelineClickHandler} className='timelineBtn'>Add Timeline</button>
            {
                inputList.map((val,index)=>(
                    
                    <div className='round'>
                   
                        <input className='timeline-input' placeholder='Enter Round Name' name="roundName" onChange={(e)=>timeLineChangeHandler(e,index)}/>
                        <input type="date" className='timeline-input' name="date"  placeholder='Enter Round Date'onChange={(e)=>timeLineChangeHandler(e,index)} />
                        <input className='timeline-input' name="description" placeholder='Enter Round Description' onChange={(e)=>timeLineChangeHandler(e,index)}/>
                    </div>
                ))
                
                
            }
        
        <button onClick={saveClickHandler} className='timelineBtn'>SAVE TimeLine</button>
        <button onClick={addJobClickHandler} disabled={addJobBtn} className='timelineBtn'>Add Job</button>
        


                 
        </div>
    </div>
  )
}

const UploadDocument = ({ handleClose, show,jobId}) => {
    const [document,setDocument]=useState("")
    const uploadDocumet=()=>{
        if(document){
            const res=uploadJobDescription(document[0],jobId);
            if(res){
                alert("Document Uploaded");
            }
            else{
                alert("Please Select a file");
            }
        }

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h4 className="modal-title text-center ">Add Job Description Document</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" name="file" id="" onChange={(e)=>{setDocument(e.target.files)}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary mx-3" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={uploadDocumet}>
                       Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

