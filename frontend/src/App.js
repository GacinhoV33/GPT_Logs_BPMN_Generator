import "./App.css";
import React from 'react';
import Navbar from './components/Navbar'
import MainApp from "./components/MainApp";
import Footer from "./components/Footer";

function App(props) {
  return (
    <div className="app_main">
      <Navbar/>
      <MainApp/>
      <Footer/>
    </div>
    
  );
}

export default App;
