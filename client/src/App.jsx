import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import axios from "axios";

function App() {
 
    const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("isDark");
    return stored ? JSON.parse(stored) ?? true : true;
  });

  axios.defaults.withCredentials = true;

    
  return (
    <div className={theme ? "isDark" : ""}>
      <Routes>
        <Route path="/" element={ <Home theme={theme} setTheme={setTheme} />} />
        <Route path="/login" element={<LoginPage theme={theme} />} />
        <Route path="/signup" element={<SignupPage theme={theme} />} />
      </Routes>
    </div>
  );
}

export default App;
