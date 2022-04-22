import React from "react";
import "./App.css";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Detail from "./components/detail/Detail";
import Create from "./components/create/Create";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;
