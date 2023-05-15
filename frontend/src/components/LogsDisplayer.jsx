import React, { useEffect, useState } from "react";
import "./LogsDisplayer.scss";
import LogComponent2 from "./LogComponent2.jsx";
import SpeedMenu from "./SpeedMenu";

const LogsDisplayer = ({
  diagram,
  setDiagram,
  apiNumber,
  setRequestStatus,
}) => {
  const [diagramHistory, setDiagramHistory] = useState([]);
  const [currentDiagramNumber, setCurrentDiagramNumber] = useState(1);
  useEffect(() => {
    if (diagram.length > 5) {
      setDiagramHistory((prev) => [...prev, diagram]);
      setCurrentDiagramNumber((prev) => prev + 1);
    }
  }, [diagram]);
  return (
    <div className="logsDisplayer-main">
      { apiNumber < 1 && <div style={{ margin: "1.5vh" }}>
        <h3>Diagram below explain how our app works.</h3>
      </div>}
      <div style={{border: '2px dashed #1976d2'}}>
      <LogComponent2
        diagram={diagram}
        setDiagram={setDiagram}
        apiNumber={apiNumber}
        setRequestStatus={setRequestStatus}
      />

      
      </div>
      <SpeedMenu
        diagramHistory={diagramHistory}
        diagram={diagram}
        currentDiagramNumber={currentDiagramNumber}
        setDiagram={setDiagram}
      />
    </div>
  );
};

export default LogsDisplayer;
