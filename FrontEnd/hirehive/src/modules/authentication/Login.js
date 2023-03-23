import React, { useContext, useState } from 'react'
import "./css/login.css";
import ill from "./img/ill.svg"
import register from "./img/register.svg"
import AuthState from '../../contexts/authentication/AuthState';


export default function Login(props) {
    const authObj = useContext(AuthState);
    const { studentLogin } = authObj;
    const [credentials, setCredentials] = useState({ email: "", password: "" });



    //handle Student login Change
    const studentLoginChange = (e) => {
        setCredentials({ [e.target.name]: e.target.value });
    }
    //handle login click 
    const studentLoginClick = async () => {
        const authToken = await studentLogin(credentials);
        console.log(authToken);
    }



    const [mode, setMode] = useState("");
    const toggleMode = () => {
        if (mode === "") {
            setMode("sign-up-mode")
        }
        else {
            setMode("");
        }
    };
    const changeMode = () => {
        console.log("changing mode...")
        props.toggleDarkMode();
    }
    return (
        <div className={`container ${mode}`}>
            <div className="forms-container">

                <div className="signin-signup">


                    <form action="/" className="sign-in-form">
                        <h2 className="title">Login</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email-id" required name="email" onChange={studentLoginChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" className="form-control" placeholder="Password" name='password' required minLength="8" onChange={studentLoginChange} />
                        </div>
                        <input type="submit" value="Login" className="btn solid" name="login" onClick={studentLoginClick} />
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media-icons">

                            <a href="/"><i className="fa fa-google-plus-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-facebook-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-linkedin-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-twitter-square fa-3x"></i></a>
                        </div>
                        <i className='fa fa-thin fa-bolt fa-2x' id="mode" onClick={changeMode} ></i>
                    </form>


                    <form action="/" className="sign-up-form">
                        <h2 className="title">Register</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="First Name" required minLength="3" name='first-name' />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Last Name" required minLength="3" name='last-name' />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Enrollment No." required minLength="8" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>


                        <input type="submit" className="btn" value="Sign up" />


                        <p className="social-text">Or Sign up with social platforms</p>


                        <div className="social-media-icons">






                            <a href="/"><i className="fa fa-google-plus-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-facebook-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-linkedin-square fa-3x"></i></a>
                            <a href="/"><i className="fa fa-twitter-square fa-3x"></i></a>






                        </div>


                    </form>
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
                    <img src={ill} className="image" alt="" />

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
                    <img src={register} className="image" alt="" />
                </div>
            </div>
        </div >

    )
}
