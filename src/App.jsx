import "./App.css";
import { Navbar } from "./Components/Home/Navbar";
import { Routes, Route } from "react-router-dom";
import { ConntactUs } from "./Components/Home/ConntactUs";
import { Features } from "./Components/Home/Features";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<ConntactUs />}></Route>
        <Route path="/features" element={<Features />}></Route>
      </Routes>
    </>
  );
}

export default App;
