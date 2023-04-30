import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "./Sidebar"

import "./css/addprofile.css"
import { useContext, useState } from "react";
import ProfileContext from "../../../contexts/profile/ProfileContext";

export const AddProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateBasicDetails } = useContext(ProfileContext);

    const [basicDetails, setBasicDetails] = useState({});
    const [currentAddress, setCurrentAddress] = useState({});
    const [permanentAddress, setPermanentAddress] = useState({});
    const [contact, setContact] = useState([]);

    const handleInput = (e) => {
        setBasicDetails({ ...basicDetails, [e.target.name]: e.target.value });
    }
    const handleCurrentAddress = (e) => {
        setCurrentAddress({ ...currentAddress, [e.target.name]: e.target.value })
    }
    const handlePermanentAddress = (e) => {
        setPermanentAddress({ ...permanentAddress, [e.target.name]: e.target.value });
    }

    const saveBasicDetails = async (e) => {
        e.preventDefault();
        const BasicDetails = { ...basicDetails, contact: [...contact], permanentAddress: { ...permanentAddress }, currentAddress: { ...currentAddress } };
        console.log(BasicDetails);
        const res = await updateBasicDetails(BasicDetails);
        if (res) {
            navigate("../");
        }
        else {
            if (res.msg === "Basic Details Already Exist") {
                navigate("../");
            }
            else {
                alert("Something Went Wrong....")

            }
        }

    }
    return (
        <div className="CompleteProfile" >
            <form className="add-form" onSubmit={(e) => saveBasicDetails(e)} method="post">
                <div className="basic">
                    <h1>Basic Details</h1>
                    <label htmlfor="firstname">First Name:
                        <input type="text" id="firstname" name="firstName" onChange={handleInput} required minLength={3} />
                    </label>
                    <label htmlfor="lastname">Last Name:
                        <input type="text" id="lastname" name="lastName" onChange={handleInput} required minLength={3} />
                    </label>
                    <label htmlfor="enrollment" name="enrollment" onChange={handleInput} required minLength={9} >Enrollment No.
                        <input type="text" id="enrollment" />
                    </label>
                    {/* <label htmlfor="email">Email-Id
                        <input type="email" id="email" />
                    </label> */}
                    <label htmlfor="gender">
                        <span>Gender:</span>
                        <div className="radio">
                            <label>Male<input type="radio" name="gender" value={"male"} onChange={handleInput} /></label>
                            <label>Female<input type="radio" name="gender" value={"female"} onChange={handleInput} /></label>
                        </div>
                    </label>
                    <label htmlfor="dob">
                        <span>Date Of Birth:</span>
                        <input type="date" id="dob" name="dateOfBirth" onChange={handleInput} />
                    </label>
                    <label htmlfor="batch">
                        <span>Batch:</span>
                        <input type="text" id="batch" name="batch" onChange={handleInput} />
                    </label>

                </div>

                <div className="basic address">
                    <label htmlfor="house-no">
                        <h1> Current Address:</h1>
                        <span>House No.</span><input type="text" id="house-no" name="houseNumber" onChange={(e) => handleCurrentAddress(e)} />
                        <span>Street</span><input type="text" name="street" onChange={(e) => handleCurrentAddress(e)} />
                        <span>City</span><input type="text" name="city" onChange={(e) => handleCurrentAddress(e)} />
                        <span>State</span><input type="text" name="state" onChange={(e) => handleCurrentAddress(e)} />
                        <span>Pin-Code</span><input type="text" name="pincode" onChange={(e) => handleCurrentAddress(e)} />
                    </label>
                </div>

                <div className="basic address">
                    <label htmlfor="house-no">
                        <h1> Pemanent Address:</h1>
                        <span>House No.</span><input type="text" id="house-no" name="houseNumber" onChange={(e) => handlePermanentAddress(e)} />
                        <span>Street</span><input type="text" name="street" onChange={(e) => handlePermanentAddress(e)} />
                        <span>City</span><input type="text" name="city" onChange={(e) => handlePermanentAddress(e)} />
                        <span>State</span><input type="text" name="state" onChange={(e) => handlePermanentAddress(e)} />
                        <span>Pin-Code</span><input type="text" name="pincode" onChange={(e) => handlePermanentAddress(e)} />
                    </label>
                </div>
                <div className="basic contact">
                    <label htmlfor="contact">
                        <h1> Conatct Details</h1>
                        <span>Primary Contact No.</span><input type="text" id="house-no" onChange={(e) => setContact([...contact, e.target.value])} required />
                        <span>Alternate Contact No.</span><input type="text" onChange={(e) => setContact([...contact, e.target.value])} />
                        <span>Email</span><input type="email" onChange={handleInput} name="email" required />
                    </label>
                    <input type="submit" className="submitBtn" />
                </div>


            </form>

        </div>
    )
}