import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import {sendFailureInfo, sendRequestInfo} from '../utils/index';
import { requestStates } from "./MainApp";
import {LOCAL_HOST, PRODUCTION_HOST} from './UserInput';

const LogHookComponent = ({ diagram, setDiagram, apiNumber, setRequestStatus, requestStatus}) => {
  const [currentApiNumber, setCurrentApiNumber] = useState(0);
  const container = document.getElementById(`container${apiNumber}`);
  const modeler = new Modeler({
    container,
    keyboard: {
      bindTo: document
    }
  });
  useEffect(() => {
    async function getInitialDiagram(){
      if (diagram === "local") {
        const data = await ( await fetch(PRODUCTION_HOST + `examples`, requestOptions)).json(); // FOR TEST REQUEST
      if(data.message !== "Internal Server Error"){
        setDiagram(data.xmlString);
      }
    }
      };
      getInitialDiagram().then((console.log("Diagram should loaded successfully")));
      setCurrentApiNumber(apiNumber)
  }, [apiNumber]);

  if(diagram.length > 5 && apiNumber !== currentApiNumber){
    modeler
    .importXML(diagram)
    .then(({ warnings }) => {
      if (warnings.length) {
        console.log("Warnings", warnings);
        setRequestStatus(requestStates.WARNING);
      }

      const canvas = modeler.get("modeling");
      canvas.setColor("CalmCustomerTask", {
        stroke: "green",
        fill: "yellow"
      });
      setCurrentApiNumber(apiNumber)
    })
    .catch((err) => {
        setRequestStatus(requestStates.ERROR);
        console.log("error", err);
      
    });
  
    if(apiNumber > 0 && requestStatus === requestStates.WAITING && requestStates.WAITING_RESEND){
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

// for init diagram
const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    exampleNumber: 5,
  }),
};

export default LogHookComponent;
