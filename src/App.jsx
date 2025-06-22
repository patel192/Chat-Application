import "./App.css";
import { Navbar } from "./Components/Home/Navbar";
import { Routes, Route } from "react-router-dom";
import { ConntactUs } from "./Components/Home/ConntactUs";
import { Features } from "./Components/Home/Features";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Home/Login";
import { Signup } from "./Components/Home/Signup";
import { ChatDashboard } from "./Components/ChatBox.jsx/ChatDashboard";
import { Profile } from "./Components/ChatBox.jsx/Profile";
import axios from "axios";
import { EditableProfile } from "./Components/ChatBox.jsx/EditableProfile";
import { FriendInfo } from "./Components/ChatBox.jsx/FriendInfo";
import Settings from "./Components/ChatBox.jsx/Settings";
import FriendRequests from "./Components/ChatBox.jsx/FriendRequests";
import GroupManagement from "./Components/ChatBox.jsx/GroupManagement";
import ArchivedChats from "./Components/ChatBox.jsx/ArchivedChats";
import SearchMessages from "./Components/ChatBox.jsx/SearchMessages";

function App() {
  axios.defaults.baseURL = "http://localhost:3003/api";
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search-messages" element={<SearchMessages />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/contact" element={<ConntactUs />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/dashboard" element={<ChatDashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/editprofile" element={<EditableProfile />}></Route>
        <Route path="/info" element={<FriendInfo />}></Route>
      </Routes>
    </>
  );
}

export default App;
