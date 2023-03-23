import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './modules/homepage/Home';
import Auth from "./modules/authentication/Auth";
import { useState } from 'react';

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


    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path='/authenticate' element={<Auth darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />

        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
