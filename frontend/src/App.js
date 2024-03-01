import { Routes, Route } from "react-router-dom";
import Home from './routes/Home/Home'
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="mx-[auto] max-w-[1920px] bg-slate-50 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
