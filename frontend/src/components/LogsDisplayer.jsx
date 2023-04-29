import React from 'react';
import './LogsDisplayer.scss';
import LogComponent2 from './LogComponent2.jsx';
import SpeedMenu from './SpeedMenu';


const LogsDisplayer = ({diagram, setDiagram, apiNumber,setRequestStatus}) => {

  return (
    <div className='logsDisplayer-main'>
        <LogComponent2 diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber} setRequestStatus={setRequestStatus}/>
        <SpeedMenu diagram={diagram}/>
    </div>
  )
}

export default LogsDisplayer