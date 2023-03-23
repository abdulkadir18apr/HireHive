
import { useState } from "react";
import authContext from "./authContext";

const authState = (props) => {
    const host = "http://localhost:8000";
    const [user, setUser] = useState({});

    const studentLogin = async ({ email, password }) => {
        const response = await fetch(`${host}api/auth/studentLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "email": email,
                "password": password
            }
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authToken)
        }
        else {
            return json;
        }
    }

    const studentSignUp = async ({ firstName, lastName, enrollment, email, password }) => {
        const response = await fetch(`${host}api/auth/studentLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "firstName": firstName,
                "lastName": lastName,
                "enrollment": enrollment,
                "email": email,
                "password": password
            }
        });
        const json = await response.json();
        if (!json.success) {
            return json.msg;
        }
        return json.id;
    }
    const studentOtpVerify = async (otpId, otp) => {
        const response = await fetch(`${host}api/auth/studentverify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "id": otpId,
                "otp": otp
            }
        });
        const json = await response.json();
        if (!json.success) {
            return json.msg;
        }
        localStorage.setItem('token', json.authToken);
        return json.success;
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
            return json.msg || json.error;
        }
        setUser(json.student);
        return user;
    }

    return (
        <authContext.Provider value={{ studentLogin, studentOtpVerify, studentSignUp, getStudentDetails }} >
            {props.children}
        </authContext.Provider>
    )
}
export default authState