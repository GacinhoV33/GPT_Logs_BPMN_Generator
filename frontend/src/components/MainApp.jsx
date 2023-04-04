import React from 'react';
import './MainApp.scss';
import UserPanel from './UserPanel';
import LogsDisplayer from './LogsDisplayer';

const MainApp = () => {
  return (
    <div className='mainApp-main'>
        <UserPanel/>
        <LogsDisplayer/>
    </div>
  )
}

export default MainApp