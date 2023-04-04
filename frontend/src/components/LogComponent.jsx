import React from 'react'
import ReactBpmn from 'react-bpmn';
import './LogComponent.scss';

const LogComponent = ({url="gpt_files/proces.bpmn"}) => {
    function onShown() {
        console.log('diagram shown');
      }
    
      function onLoading() {
        console.log('diagram loading');
      }
    
      function onError(err) {
        console.log('failed to show diagram');
      }
    return (
        <ReactBpmn
                    url={url}
                    onShown={ onShown }
                    onLoading={ onLoading }
                    onError={ onError }
                />
       
  )
}

export default LogComponent;