import React from 'react'
import "../css/dashboard.css"

export  function StudentCard() {
  return (
    <div className='student_card'>
    <img src='https://picsum.photos/150/150' alt="student"/>
    <div className='student_details'>
      <h2>Abdul Kadir</h2>
      <h2>Master of Computer Application</h2>
      <p>Skills: C++, Python</p>
      <p>Cgpa/Prcentage: 90%</p>
    </div>
    <div className="student_btn">
      <button>View Profile</button>
      <button>View Resume</button>
    </div>
  </div>
  )
}
