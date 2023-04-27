import React, {useState} from 'react';
import './MainApp.scss';
import UserPanel from './UserPanel';
import LogsDisplayer from './LogsDisplayer';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

const MainApp = ({gptVersion}) => {
  const [diagram, setDiagram] = useState("local");
  const [apiNumber, setApiNumber] = useState(4);
  return (
    <div className='mainApp-main'>
        <UserPanel gptVersion={gptVersion} diagram={diagram} setDiagram={setDiagram} setApiNumber={setApiNumber}/>
        <LogsDisplayer diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber} setApiNumber={setApiNumber}/>
    </div>
  )
}

export default MainApp