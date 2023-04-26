import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";

const LogHookComponent = ({ diagram, setDiagram, apiNumber }) => {

  const container = document.getElementById(`container${apiNumber}`);
  const modeler = new Modeler({
    container,
    keyboard: {
      bindTo: document
    }
  });
  // const [modeler, setModeler] = useState(
  //   new Modeler({
  //     container,
  //     keyboard: {
  //       bindTo: document,
  //     },
  //   })
  // );
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
        console.log("Current diagram if:", diagram)

      } 
    else{
      console.log("Im in")
      console.log("Current diagram elsE:", diagram)
      modeler.clear();
      modeler.importXML(diagram)
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
    }
    // else {
      // const newModeler = new Modeler({
      //   container,
      //   keyboard: {
      //     bindTo: document,
      //   },
      // });
    //   modeler
    //     .importXML(diagram)
    //     .then(({ warnings }) => {
    //       if (warnings.length) {
    //         console.log("Warnings", warnings);
    //       }

    //       const canvas = modeler.get("modeling");
    //       canvas.setColor("CalmCustomerTask", {
    //         stroke: "green",
    //         fill: "yellow",
    //       });
    //     })
    //     .catch((err) => {
    //       console.log("error", err);
    //     });
    //   // setModeler(newModeler);
    // }
  }, [apiNumber]);

  if(diagram.length > 10){
    console.log("Current diagram secondif:", diagram)
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
    });
    
  }
  console.log("Current diagram component: ", diagram)

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
