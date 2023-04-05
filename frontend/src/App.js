import "./App.css";
import React from 'react';
import Navbar from './components/Navbar'
import MainApp from "./components/MainApp";
import Footer from "./components/Footer";
import { useState } from "react";

function App(props) {
  const [gptVersion, setGptVersion] = useState("3.5");
  return (
    <div className="app_main">
      <Navbar setGptVersion={setGptVersion}/>
      <MainApp gptVersion={gptVersion}/>
      <Footer/>
    </div>
    
  );
}

export default App;
