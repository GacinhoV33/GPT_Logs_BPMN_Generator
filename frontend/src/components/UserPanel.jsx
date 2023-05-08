import React, { useState } from "react";
import "./UserPanel.scss";
import UserInput from "./UserInput";
import { Slider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { requestStates } from "./MainApp";
import { Alert, AlertTitle } from "@mui/material";
const UserPanel = ({
  gptVersion,
  diagram,
  setDiagram,
  setApiNumber,
  requestStatus,
  setRequestStatus,
}) => {
  const [temperatureValue, setTemperatureValue] = useState(0.73);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [itemValue, setItemValue] = useState(5);

  function handleChange(event) {
    setItemValue(event.target.value);
  }

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
          <h5>Temperature: {temperatureValue.toFixed(2)}</h5>
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
                <MenuItem value={numb} key={`itemNumb-${numb}`}>
                  {numb}
                </MenuItem>
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
          <h5>Frequency Penalty: {frequencyPenalty.toFixed(2)}</h5>
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
        <UserInput
          requestStatus={requestStatus}
          setRequestStatus={setRequestStatus}
          itemValue={itemValue}
          temperatureValue={temperatureValue}
          frequencyPenalty={frequencyPenalty}
          diagram={diagram}
          setDiagram={setDiagram}
          setApiNumber={setApiNumber}
        />
        <div style={{ height: "5vh", gridRow: 2, gridColumn: 1 }}>
          {requestStatus === requestStates.WAITING && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "darkgreen", marginRight: "1.5vw" }}>
                ChatGPT is generating diagram
              </h2>
              <CircularProgress />
            </div>
          )}
          {requestStatus === requestStates.CORRECT && (
            <Alert severity="success" style={{ marginTop: "1vh" }}>
              <AlertTitle>Success</AlertTitle>
              Diagram BPMN 2.0 generated successfully —{" "}
              <strong>check it out!</strong>
            </Alert>
          )}
          {requestStatus === requestStates.WARNING && (
            <Alert severity="warning" style={{ marginTop: "1vh" }}>
              <AlertTitle>Warning</AlertTitle>
              ChatGPT generated not valid BPMN 2.0 file —{" "}
              <strong>Try ask him one more time</strong>
            </Alert>
          )}
          {requestStatus === requestStates.ERROR && (
            <Alert severity="error" style={{ marginTop: "1vh" }}>
              <AlertTitle>Error</AlertTitle>
              Server returned error, you may enter too long describtion of business process or server is not working. 
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
