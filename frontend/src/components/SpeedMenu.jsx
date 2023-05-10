import React from "react";
// import { SpeedDial } from "@mui/material/SpeedDial";
import { SpeedDialAction, SpeedDial } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const BottomMenu = ({diagram, setDiagram, changeSaveFlag, diagramHistory, currentDiagramNumber}) => {
    
    function handleCopy(){
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
      changeSaveFlag(prev => prev+1);
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
        sx={{ position: "absolute", right: 85, top: 350}}
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
    </div>
  );
};

export default BottomMenu;
