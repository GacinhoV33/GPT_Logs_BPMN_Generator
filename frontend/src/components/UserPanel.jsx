import React, { useState } from "react";
import "./UserPanel.scss";
import UserInput from "./UserInput";
import { Slider } from "@mui/material";

const UserPanel = ({ gptVersion }) => {
  const [temperatureValue, setTemperatureValue] = useState(0.73);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.73);

  return (
    <div className="userPanel-main">
      <div className="userPanel-firstItem">
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <h5>Temperature: {temperatureValue}</h5>
        <Slider
          defaultValue={0.73}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={temperatureValue}
          step={0.01}
          // marks
          min={0}
          max={1}
          onChange={(event, newValue) => setTemperatureValue(newValue)}
        />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <h5>Frequency Penalty: {frequencyPenalty}</h5>
        <Slider
          defaultValue={0}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={frequencyPenalty}
          step={0.01}
          // marks
          min={0}
          max={1}
          onChange={(event, newValue) => setFrequencyPenalty(newValue)}
        />
        </div>
        
      </div>
      <div className="userPanel-secondItem">
        <UserInput />
      </div>
    </div>
  );
};

export default UserPanel;
