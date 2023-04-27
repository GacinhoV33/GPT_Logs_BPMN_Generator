import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
import {sendFailureInfo, sendRequestInfo} from '../utils/index';
const LogHookComponent = ({ diagram, setDiagram, apiNumber }) => {

  const container = document.getElementById(`container${apiNumber}`);
  const modeler = new Modeler({
    container,
    keyboard: {
      bindTo: document
    }
  });

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
      console.log("error", err);
      sendFailureInfo(err);
    });

    sendRequestInfo();
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
          border: "1px solid #000000",
          height: "70vh",
          width: "80vw",
        }}
      ></div>
    </div>
  );
};
export default LogHookComponent;
