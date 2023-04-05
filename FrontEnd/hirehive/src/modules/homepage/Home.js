import React from 'react'

import Navbar from './Navbar';
import Header from './Header';

import "./css/home.css";
import Recruiter from './Recruiter';
import Footer from './Footer';
// import StudentCard from './StudentCard';

export default function home() {
  return (
    <div className="homepage">
      <Navbar />
      <Header />
      <Recruiter />
      {/* <StudentCard /> */}
      <Footer />
    </div>
  )
}
