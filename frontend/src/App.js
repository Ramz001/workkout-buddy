import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./routes/SignUp/SignUp";
import Login from "./routes/Login/Login";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";

function App() {
  return (
    <div className="mx-[auto] max-w-[1920px] bg-slate-50 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
