import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './modules/homepage/Home';
import Auth from "./modules/authentication/Auth";
import Dashboard from './modules/student/Dashboard';
import { useState } from 'react';
import ProfileState from './contexts/profile/ProfileState';
import Profile from "./modules/student/Profile"
import { AddProfile } from './modules/student/profileComponents/AddProfile';
import {RecruiterAuth} from "./modules/recruiter/RecruiterAuth"
import { RecruiterDahboard } from './modules/recruiter/RecruiterDahboard';
import { RecruiterProfile } from './modules/recruiter/RecruiterProfile';
import { PostJob } from './modules/recruiter/PostJob';



function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    if (darkMode === false) {
      setDarkMode(true);
      document.documentElement.style.setProperty('--auth-bg-color', "#161F2C");
      document.documentElement.style.setProperty('--auth-bg-dark-color', "#394657");
      document.documentElement.style.setProperty('--auth-font-color', "#e4e4e7");
    }
    else {
      setDarkMode(false);
      document.documentElement.style.setProperty('--auth-bg-color', "white");
      document.documentElement.style.setProperty('--auth-bg-dark-color', "white");
      document.documentElement.style.setProperty('--auth-font-color', "#0f172a");

    }

  }
  return (
    <ProfileState>
      <div className="app">

        <Routes>
          <Route path="*" element={<Home />} />
          <Route path='/authenticate' element={<Auth darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path='/student' element={<Dashboard />} >
            <Route path="addBasicDetails" element={<AddProfile />} />

            <Route path="addBasicDetails/:id" element={<AddProfile />} />

            <Route path="profile" element={<Profile />}>

            </Route>
            <Route path="profile/:id" element={<Profile />}>

            </Route>
          </Route>

          <Route path="/recruiters/login" element={<RecruiterAuth/>}/>
          <Route path="/recruiters" element={<RecruiterDahboard/>}>
            <Route path="profile" element={<RecruiterProfile/>}/>
            <Route path="postJob" element={<PostJob/>}/>
          </Route>


        </Routes>


      </div>
    </ProfileState>

  );
}

export default App;
