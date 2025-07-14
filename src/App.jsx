import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ConntactUs } from "./Components/Home/ConntactUs";
import { Features } from "./Components/Home/Features";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Home/Login";
import { Signup } from "./Components/Home/Signup";
import { UserDashBoard } from "./Components/user/UserDashBoard";
import { Settings } from "./Components/ChatBox.jsx/Settings";
import { Profile } from "./Components/ChatBox.jsx/Profile";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:3003/";
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/contact" element={<ConntactUs />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/dashboard" element={<UserDashBoard />}></Route>
      </Routes>
    </>
  );
}

export default App;
