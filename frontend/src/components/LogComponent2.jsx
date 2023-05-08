import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
import {sendFailureInfo, sendRequestInfo} from '../utils/index';
import { requestStates } from "./MainApp";

const LogHookComponent = ({ diagram, setDiagram, apiNumber, setRequestStatus, saveFlag}) => {
  const [blobSvg, setBlobSvg] = useState('')
  const container = document.getElementById(`container${apiNumber}`);
  const modeler = new Modeler({
    container,
    keyboard: {
      bindTo: document
    }
  });
  const [isError, setError] = useState(false);
  useEffect(() => {
    if (diagram === "local") {
      axios
        .get("./gpt_files/gpt_response4.bpmn")
        .then((r) => {
          setDiagram(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
      } 
  }, [apiNumber]);
  
  useEffect(() => {
    if(diagram.length > 5){
      console.log('svg')
      // TODO do it correctly
      const svg = modeler.saveSVG().then((data) => setBlobSvg(data.svg));
      const filename = "gpt_diagram"
      const blob = new Blob([blobSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      console.log(blob)
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);  
        }
  }, [saveFlag])
  
  if(diagram.length > 5){
    modeler
    .importXML(diagram)
    .then(({ warnings }) => {
      if (warnings.length) {
        console.log("Warnings", warnings);
      }

      const canvas = modeler.get("modeling");
      canvas.setColor("CalmCustomerTask", {
        stroke: "green",
        fill: "yellow"
      });
    })
    .catch((err) => {
      if(isError !== true) setError(true); // IMPORTANT, without if statement component is re-rendering all the time and stay in a loop.
      console.log("error", err);

    });
    if(isError){
      sendFailureInfo("Error");
      setRequestStatus(requestStates.WARNING);
    }
    else if(apiNumber > 0){
      sendRequestInfo();
      setRequestStatus(requestStates.CORRECT);
    }    

    const bjsContainer = document.getElementsByClassName('bjs-container');
      if(bjsContainer.length > 1){
        bjsContainer[0].remove();
      }
  }

  return (
    <div className="App">
      <div
        id={`container${apiNumber}`}
        style={{
          height: "70vh",
          width: "80vw",
        }}
      ></div>
    </div>
  );
};
export default LogHookComponent;
