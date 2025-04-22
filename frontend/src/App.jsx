import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

function App() {
  const [email, setEmail] = React.useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login email={email} setEmail={setEmail} />}
        />
        <Route path="/dashboard" element={<Dashboard email={email} />} />
      </Routes>
    </Router>
  );
}

export default App;
