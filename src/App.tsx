import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #E69B69, #FFFFFF)",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
