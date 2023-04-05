import React from 'react';
import './MainApp.scss';
import UserPanel from './UserPanel';
import LogsDisplayer from './LogsDisplayer';

const MainApp = ({gptVersion}) => {
  return (
    <div className='mainApp-main'>
        <UserPanel gptVersion={gptVersion}/>
        <LogsDisplayer/>
    </div>
  )
}

export default MainApp