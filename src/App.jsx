import "./App.css";
import { Navbar } from "./Components/Home/Navbar";
import { Routes,Route } from "react-router-dom";
import { ConntactUs } from "./Components/Home/ConntactUs";
function App() {
  return (
    <>
      <Routes>
      <Navbar />
        <Route path="/contact" element="{ConntactUs/>}"></Route>
      </Routes>
  
    </>
  );
}

export default App;
