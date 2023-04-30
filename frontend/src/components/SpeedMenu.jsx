import React from "react";
// import { SpeedDial } from "@mui/material/SpeedDial";
import { SpeedDialAction, SpeedDial } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const BottomMenu = ({diagram}) => {
    
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

    }
    function handleNext(){

    }
    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy', handleClick: handleCopy },
        { icon: <SaveIcon />, name: 'Save',  handleClick: handleSave },
        { icon: <PrintIcon />, name: 'Print',  handleClick: handleNext },
        { icon: <ShareIcon />, name: 'Share',  handleClick: handlePrevious },
      ];
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
        />
        ))}
      </SpeedDial>
    </div>
  );
};

export default BottomMenu;
