import React, { useState } from "react";
import "./UserPanel.scss";
import UserInput from "./UserInput";
import { Slider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

const UserPanel = ({ gptVersion, diagram, setDiagram, setApiNumber }) => {
  const [temperatureValue, setTemperatureValue] = useState(0.73);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [itemValue, setItemValue] = useState(5);

  function handleChange(event) {
    setItemValue(event.target.value);
  }

  const [showWaiting, setShowWaiting] = useState(false);

  return (
    <div className="userPanel-main">
      <div className="userPanel-firstItem">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gridColumn: 1,
            gridRow: 1,

          }}
        >
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
       
        <div style={{ border: "1px solid black", gridColumn: 2 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Item number
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={itemValue}
              onChange={handleChange}
              label="Item number"
            >
              {[5, 10, 15, 20].map((numb) => (
                <MenuItem value={numb} key={`itemNumb-${numb}`}>{numb}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gridColumn: 2,
            gridRow: 1,
          }}
        >
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
        
        <UserInput setShowWaiting={setShowWaiting} itemValue={itemValue} temperatureValue={temperatureValue} frequencyPenalty={frequencyPenalty} diagram={diagram} setDiagram={setDiagram} setApiNumber={setApiNumber}/>
        <div
          style={{ height: "5vh", gridRow: 2, gridColumn: 1 }}
        >
          {showWaiting && (
            <div style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
              <h2 style={{color: 'darkgreen', marginRight: '1.5vw'}}>ChatGPT is generating diagram</h2>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
