import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Task from "./components/Task";
import Dashboard from "./components/Dashboard";
import Authenticate from "./components/Authenticate";

function App() {
  // localStorage.setItem("isUpdated",false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Authenticate />}>
          <Route path="/home" element={<Home />} />
          <Route path="/task" element={<Task />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
