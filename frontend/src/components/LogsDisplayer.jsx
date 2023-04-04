import React from 'react';
import './LogsDisplayer.scss';
import LogComponent from './LogComponent.jsx'

const LogsDisplayer = () => {
  return (
    <div className='logsDisplayer-main'>
        <LogComponent/>
    </div>
  )
}

export default LogsDisplayer