
import authContext from "./AuthContext";
import { useState } from "react";

const AuthState = (props) => {
    const host = "http://localhost:8000/";
    const [user, setUser] = useState("");

    const studentLogin = async ({ email, password }) => {
        const response = await fetch(`${host}api/auth/studentLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            return json;
        }
        else {
            return json;
        }
    }

    const studentSignUp = async ({ firstName, lastName, enrollment, email, password }) => {
        const response = await fetch(`${host}api/auth/studentSignup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "enrollment": enrollment,
                "email": email,
                "password": password
            })
        });
        const json = await response.json();
        if (!json.success) {
            return json;
        }
        return json;
    }
    const studentOtpVerify = async (otpId, otp) => {
        const response = await fetch(`${host}api/auth/studentverify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": otpId,
                "otp": otp
            })
        });
        const json = await response.json();
        if (!json.success) {
            return json;
        }
        localStorage.setItem('token', json.authToken);
        return json;
    }
    const getStudentDetails = async () => {
        const response = await fetch(`${host}api/auth/getStudent`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }
        });
        const json = response.json();
        if (!json.success) {
            return json;
        }
        setUser(json.student);
        return json;
    }

    return (
        <authContext.Provider value={{ studentLogin, studentOtpVerify, studentSignUp, getStudentDetails }} >
            {props.children}
        </authContext.Provider>
    )
}
export default AuthState;