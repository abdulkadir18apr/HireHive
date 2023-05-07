import React, { useContext, useState } from 'react'
import "../authentication/css/login.css"
import ill from "../authentication/img/ill.svg"
import register from "../authentication/img/register.svg"
import { useNavigate } from "react-router-dom";
import { getRecruiter, recruiterLogin, recruiterSignUp, recruiterVerifyOtp } from './context/apicalls';
import { useRecruiterContext } from './context/RecruiterContext';
;


export default function Login(props) {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({});
    const [otpDisplay, setOtpDisplay] = useState("none");

    const {setRecruiter}=useRecruiterContext();





    //handle Student login Change
    const recruiterLoginChange = (e) => {
        console.log(e.target.value);
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    //handle login click 
    const recruiterLoginClick = async (e) => {
        e.preventDefault();
        const res=await recruiterLogin(credentials);
        if(res.success){
            localStorage.setItem("token",res.authToken);
            const response=await getRecruiter();
            if(response.success){
                setRecruiter(response.recruiter);
            }
            else{
                navigate("/")
            }
            navigate("../recruiters");
           
        }
        else{
            alert("Login Failed.....")
        
        }
        setCredentials({});


    }
    //Student SignUp Click Handle
    const recruiterSignUpClick = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const res=await recruiterSignUp(credentials);
      
        if(res.success){
            setCredentials({id:res.id})
            alert("OTP has been sent to your email Id")
            setOtpDisplay("block");            
        }
        else{
            
            alert("Please try again in sometime");
        }
       
    }
    //verifyOtp
    const verifyRecruiterOtp = async (e) => {
        e.preventDefault();
        const res=await recruiterVerifyOtp(credentials);
        if(res){
            localStorage.setItem("token",res.authToken);
            const response=await getRecruiter();
            if(response.success){
                setRecruiter(response.recruiter)
                navigate("../recruiters");
            }
        
            
           
        }
        else{
            alert("please try after sometime ")
            setOtpDisplay("none");
        }
        setCredentials({})

    }



    const [mode, setMode] = useState("");
    const toggleMode = () => {
        if (mode === "") {
            setCredentials({});
            setMode("sign-up-mode")
            setOtpDisplay("none")
        }
        else {
            setMode("");
            setCredentials({});
            setOtpDisplay("none")
        }
    };
    const changeMode = (e) => {
        e.preventDefault();
        console.log("Changing")
        props.toggleDarkMode();
    }
    return (
        <div className={`loginContainer ${mode}`}>
            <div className="forms-container">

                <div className="signin-signup">


                    <form onSubmit={recruiterLoginClick} method="POST" className="sign-in-form">
                        <h2 className="title">Login</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email-id" required name="email" onChange={recruiterLoginChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" className="form-control" placeholder="Password" name='password' required minLength="8" onChange={recruiterLoginChange} />
                        </div>
                        <input type="submit" value="Login" className="btn solid" name="login" onClick={(e) => recruiterLogin(e)} />
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media-icons">

                            <a href="/"><i className="fa fa-google-plus-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-facebook-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-linkedin-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-twitter-square fa-3x"></i></a>
                        </div>

                    </form>
                    <a onClick={changeMode} href="/" ><i className='fa fa-solid fa-bolt fa-2x'></i></a>




                    <form onSubmit={recruiterSignUpClick} method="POST" className="sign-up-form" >
                        <h2 className="title">Register</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="First Name" required minLength="3" name='firstName' onChange={recruiterLoginChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Last Name" required minLength="3" name='lastName' onChange={recruiterLoginChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Company Name" required onChange={recruiterLoginChange} name="companyName" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" required onChange={recruiterLoginChange} name="email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={recruiterLoginChange} name="password" />
                        </div>


                        <input type="submit" className="btn" value="Send OTP" />

                    </form>
                    <div className="otp-verification">
                        <form method='POST' onSubmit={verifyRecruiterOtp} style={{ display: `${otpDisplay}` }}>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Enter-OTP" onChange={recruiterLoginChange} name="otp" />
                            </div>
                            <input type="submit" value="VERIFY OTP" className="btn" />



                        </form>
                    </div>
                </div>

            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">


                        <h3>Register</h3>
                        <p>
                            Register with Hire-Hive to ease your placement process
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={toggleMode}>
                            Sign up
                        </button>
                    </div>
                    <img src={ill} className="login-image" alt="" />

                </div>
                <div className="panel right-panel">
                    <div className="content">

                        <h3>Already registered ?</h3>
                        <p>
                            Start exploring new opportunities by login with your credentials
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={toggleMode}>
                            Sign In
                        </button>
                    </div>
                    <img src={register} className="login-image" alt="" />
                </div>
            </div>
        </div >

    )
}
