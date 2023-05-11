import React, { useState } from "react";
import "./UserPanel.scss";
import UserInput from "./UserInput";
import { Slider, Tooltip, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { requestStates } from "./MainApp";
import { Alert, AlertTitle } from "@mui/material";
import Switch from "@mui/material/Switch";

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
  const [switchChecked, setSwitchChecked] = React.useState(true);

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };
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

        <div style={{ border: "1px solid black", gridColumn: 2, gridRow: 2 }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Amount of items
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={itemValue}
              onChange={handleChange}
              label="Item number"
            >
              {[5, 6, 7, 8, 9, 10, 12, 15].map((numb) => (
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gridColumn: 1,
            gridRow: 2,
          }}
        >
          <Tooltip title='In case of failure, server will modify and fix your request and ask Chat GPT for diagram one more time.'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <h5>Re-Generate answer</h5>
              <Switch onClick={handleSwitchChange} checked={switchChecked} />
            </div>
          </Tooltip>
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
          regenerateAnswer={switchChecked}
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
              <Alert severity="info" style={{ marginRight: "1.75vw" }}>
                <AlertTitle style={{ marginRight: "1vw" }}>
                  ChatGPT is generating a diagram
                </AlertTitle>
                Usually it takes more than 2 minutes. Be patient.
                {/* </div> */}
              </Alert>
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
              Server returned error, you may enter too long describtion of
              business process or server is not working.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
