import "./App.css";
// import BPMNjs from "bpmn-js";
import React from 'react';
import {useEffect, useRef} from 'react';


import ReactBpmn from 'react-bpmn';


function App(props) {

  function onShown() {
    console.log('diagram shown');
  }

  function onLoading() {
    console.log('diagram loading');
  }

  function onError(err) {
    console.log('failed to show diagram');
  }

  return (
    <div style={{height: '70vh', width: '100vw'}}>
      <ReactBpmn
            url="gpt_files/proces.bpmn"
            onShown={ onShown }
            onLoading={ onLoading }
            onError={ onError }
      />
        <div style={{height: '10vh'}}>
        DEPLOY TEST HERE

        </div>
    </div>
    
  );
}

export default App;
