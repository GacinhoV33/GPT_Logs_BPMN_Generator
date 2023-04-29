import React, { useEffect, useState } from 'react';
import './LogsDisplayer.scss';
import LogComponent2 from './LogComponent2.jsx'

const LogsDisplayer = ({diagram, setDiagram, apiNumber,setRequestStatus}) => {
  // const [myComp, setMyComp] = useState(<LogComponent2 diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber}/>)
  // useEffect(() => {
    
  //   setMyComp(<LogComponent2 diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber}/>);
  // }, [diagram])
  return (
    <div className='logsDisplayer-main'>
      {/* {myComp} */}
        <LogComponent2 diagram={diagram} setDiagram={setDiagram} apiNumber={apiNumber} setRequestStatus={setRequestStatus}/>
    </div>
  )
}

export default LogsDisplayer