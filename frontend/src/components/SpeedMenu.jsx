import React, {useState} from "react";
// import { SpeedDial } from "@mui/material/SpeedDial";
import { SpeedDialAction, SpeedDial } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Modeler from "bpmn-js/lib/Modeler";

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BottomMenu = ({diagram, setDiagram, diagramHistory, currentDiagramNumber}) => {
  const [open, setOpen] = useState(false);
  const [svgData, setSVGData] = useState('');
  const handleSnack = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

    function handleCopy(){
        handleSnack();
        navigator.clipboard.writeText(diagram);
    }
    function handleSave(){
        const filename = "gpt_diagram"
        const blob = new Blob([diagram], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
    function handlePrevious(){
      // console.log('CurrentDiagramNumber: handlePrevious: ', currentDiagramNumber)
      setDiagram(diagramHistory[currentDiagramNumber-1])
    }
    
    function handleNext(){
      
    }
    
    function handlePrint(){
      const divMock = <div id='mock-div'></div>
      const container = document.getElementById(`mock-div`);
      const bpmnModeler = new Modeler({
        container,
      });
      
      bpmnModeler.importXML(diagram, function(err) {
        if (err) {
          console.error(err);
        } else {
          const canvas = bpmnModeler.get('canvas');
          canvas.zoom('fit-viewport');
          function saveData(data){
            const svgBlob = new Blob([data], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'diagram2.svg';
            downloadLink.click();
          }
          bpmnModeler.saveSVG().then((data) => saveData(data.svg)); 
          
        }
      })
    }

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy', handleClick: handleCopy },
        { icon: <SaveIcon />, name: 'Save',  handleClick: handleSave },
        { icon: <PrintIcon />, name: 'Print SVG',  handleClick: handlePrint },
        { icon: <UndoIcon />, name: 'Previous',  handleClick: handlePrevious },
        { icon: <RedoIcon />, name: 'Next',  handleClick: handleNext },

      ];

    const isPreviousDisabled = !(diagramHistory.length > 1);
    const isNextDisabled = !(diagramHistory.length > 1);

    return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", right: 85, top: 400}}
        icon={<SpeedDialIcon />}
        direction="down"
      >
        {actions.map((action, index) => (
          <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipPlacement="right"
          onClick={action.handleClick}
          disabled={action.name === 'Previous' && isPreviousDisabled || action.name === 'Next' && isNextDisabled}
        />
        ))}
      </SpeedDial>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Diagram BPMN 2.0 copied successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BottomMenu;
