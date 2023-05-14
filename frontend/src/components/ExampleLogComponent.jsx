import {examplesData} from "./Examples";
import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from 'axios'
import './Examples.scss';
import { PRODUCTION_HOST, LOCAL_HOST } from "./UserInput";
const ExampleLogComponent = ({ currentExample }) => {
  const [diagramExample, setDiagramExample] = useState('local');
  const container = document.getElementById('containerExample');
  const modeler = new Modeler({
    container,
    keyboard: {
      bindTo: document
    }
  });

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
      
      const data = await ( await fetch(PRODUCTION_HOST + `examples`, requestOptions)).json(); // FOR TEST REQUEST
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

export default ExampleLogComponent;
