import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/authenticate');
            alert("Please Login First");

        }

    }, [])
    return (
        <div>
            <h1>Let's Start Building Student Module This Week</h1>
        </div>
    )
}
