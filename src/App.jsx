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
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/contact" element={<ConntactUs />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/dashboard" element={<ChatDashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
