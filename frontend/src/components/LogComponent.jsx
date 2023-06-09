import React, { useEffect } from "react";
import "./LogComponent.scss";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { requestStates } from "./MainApp";
import { LOCAL_HOST, PRODUCTION_HOST } from "./UserInput";

const LogComponent = (
  diagram,
  setDiagram,
  apiNumber,
  setRequestStatus,
) => {
  useEffect(() => {
    async function getInitialDiagram(){
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exampleNumber: currentExample,
        }),
      };
      // const ADRESS = isGPT ? PRODUCTION_HOST + `examplesGPT` : PRODUCTION_HOST + `examples`; 
      const ADRESS = isGPT ? LOCAL_HOST + `examplesGPT` : LOCAL_HOST + `examples`; 

      const data = await ( await fetch(ADRESS, requestOptions)).json(); 
      // const data = await ( await fetch(PRODUCTION_HOST + `examples`, requestOptions)).json(); 

      if(data.message !== "Error"){
        setDiagramExample(data.xmlString);
      }

      };
      getInitialDiagram().then((console.log("Diagram loaded successfully")));

  }, [currentExample]);


  if(diagramExample.length > 5){
    modeler
    .importXML(diagramExample)
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
      console.log("error", err);
    });

    const bjsContainer = document.getElementsByClassName('bjs-container');
      if(bjsContainer.length > 1){
        bjsContainer[0].remove();
      }
  }
  return (
    <div className="AppExample">
      <div
        id='containerExample'
        style={{
          border: "1px solid #000000",
          height: "75vh",
          width: "80vw",
          marginTop: '5vh'
        }}
      ></div>
    </div>
  );
};

export default LogComponent;

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    exampleNumber: 5,
  }),
};