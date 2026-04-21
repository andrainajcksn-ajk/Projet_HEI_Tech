import Navbar from "./components/Navbar";
import Stats from "./components/stats";
import About from "./components/about";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import Profil from "./pages/Profil";
import Messages from "./pages/Messages";
import Explorer from "./pages/Explorer";
import MesLivres from "./pages/Meslivres";
import Parametres from "./pages/Parametres";

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
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/explorer" element={<Explorer />} />
      <Route path="/meslivres" element={<MesLivres />} />
      <Route path="/parametres" element={<Parametres />} />
    </Routes>
  );
}

export default App;