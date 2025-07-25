import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Contacts } from "./Components/user/Contacts";

import { Features } from "./Components/Home/Features";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Home/Login";
import { Signup } from "./Components/Home/Signup";
import { UserDashBoard } from "./Components/user/UserDashBoard";
import axios from "axios";
import { Chats } from "./Components/ChatBox.jsx/Chats";

function App() {
  axios.defaults.baseURL = "http://localhost:3003/";
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/dashboard" element={<UserDashBoard />}>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="chats" element={<Chats currentUserId="" chatId=""/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
