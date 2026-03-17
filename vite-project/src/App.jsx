import Navbar from "./components/Navbar";
import Stats from "./components/stats";
import About from "./components/about";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Stats />
          <About />
        </>
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;