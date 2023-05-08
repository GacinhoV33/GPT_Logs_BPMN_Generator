import React, { useEffect, useState } from 'react';
import './LogsDisplayer.scss';
import LogComponent2 from './LogComponent2.jsx';
import SpeedMenu from './SpeedMenu';

const LogsDisplayer = ({diagram, setDiagram, apiNumber,setRequestStatus}) => {
  const [saveFlag, changeSaveFlag] = useState(0);
  const [diagramHistory, setDiagramHistory] = useState([]);
  const [currentDiagramNumber, setCurrentDiagramNumber] = useState(1);
  useEffect(() => {
    if(diagram.length > 5){
      setDiagramHistory(prev => [...prev, diagram]);
      setCurrentDiagramNumber(prev => prev+1);
      console.log('CurrentDiagramNumber: useEffect: ', currentDiagramNumber)
    }
  }, [diagram]);
  console.log(diagramHistory.length);
  return (
    <div className='logsDisplayer-main'>
        <LogComponent2 diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber} setRequestStatus={setRequestStatus} saveFlag={saveFlag}/>
        <SpeedMenu diagramHistory={diagramHistory} diagram={diagram} changeSaveFlag={changeSaveFlag} currentDiagramNumber={currentDiagramNumber} setDiagram={setDiagram}/>
    </div>
  )
}

export default LogsDisplayer