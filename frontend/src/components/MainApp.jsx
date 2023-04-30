import React, {useState} from 'react';
import './MainApp.scss';
import UserPanel from './UserPanel';
import LogsDisplayer from './LogsDisplayer';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

export const requestStates = {
  INIT: 1,
  WAITING: 2,
  CORRECT: 3, 
  WARNING: 4,
  ERROR: 5,
}

const MainApp = ({gptVersion}) => {
  const [diagram, setDiagram] = useState("local");
  const [apiNumber, setApiNumber] = useState(0);
  const [requestStatus, setRequestStatus] = useState(requestStates.INIT)
  return (
    <div className='mainApp-main'>
        <UserPanel gptVersion={gptVersion} diagram={diagram} setDiagram={setDiagram} setApiNumber={setApiNumber} requestStatus={requestStatus} setRequestStatus={setRequestStatus}/>
        <LogsDisplayer diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber} setApiNumber={setApiNumber} setRequestStatus={setRequestStatus}/>
    </div>
  )
}

export default MainApp