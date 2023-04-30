import "./App.css";
import React from 'react';
import Navbar from './components/Navbar'
import MainApp from "./components/MainApp";
import Footer from "./components/Footer";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Examples from './components/Examples';
import NotFound from "./components/NotFound";

function App(props) {
  const [gptVersion, setGptVersion] = useState("3.5");
  return (
    <div className="app_main">
      <Navbar setGptVersion={setGptVersion}/>
      <Routes>
            <Route path='/' element={<MainApp gptVersion={gptVersion}/>} key='route1'/>
            <Route path='/examples' element={<Examples/>} />
            <Route path='*' element={<NotFound/>} key='route-non-found'/>
        </Routes>
      {/* <MainApp gptVersion={gptVersion}/> */}
      {/* <Footer/> */}
    </div>
    
  );
}

export default App;
