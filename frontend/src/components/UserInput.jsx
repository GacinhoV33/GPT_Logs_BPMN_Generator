import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { requestStates } from "./MainApp";

export const LOCAL_HOST = "http://127.0.0.1:5000/";
export const LOCAL_HOST2 = "http://192.168.0.17:5000";
export const PRODUCTION_HOST = "https://gpt-logs-4.azurewebsites.net/";


const UserInput = ({
  requestStatus,
  setRequestStatus,
  itemValue,
  temperatureValue,
  frequencyPenalty,
  setDiagram,
  setApiNumber,
  regenerateAnswer
}) => {

  const [failCounter, setFailCounter] = useState(0);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {

    if (((requestStatus === 5 || requestStatus === 4) && regenerateAnswer) && failCounter < 1) {
      setFailCounter(prev => prev + 1)
      console.log("BPMN JS XML error - trying to regenerate answer")
      resendRequestToChatGPT(userInput)
    }
    console.log(requestStatus)

  }, [requestStatus])

  const form = useRef();

  async function handleSubmit(values) {
    setUserInput(values.message)
    sendRequestToChatGPT(values.message);
  }

  async function sendRequestToChatGPT(message) {
    setFailCounter(0);
    setRequestStatus(requestStates.WAITING);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_text: message,
        items_number: itemValue,
        temperature: temperatureValue,
        frequency_penalty: frequencyPenalty,
        regenerate_answer: regenerateAnswer
      }),
    };
    // LOCAL
    // const data = await (await fetch(LOCAL_HOST + `testRequest`, requestOptions)).json(); // FOR TEST REQUEST
    // const data = await ( await fetch(LOCAL_HOST + `openai`, requestOptions)).json(); // FOR LOCAL OPEN AI TESTING
    // PRODUCTION
    const data = await ( await fetch(PRODUCTION_HOST + `openai`, requestOptions)).json(); // FOR LOCAL OPEN AI TESTING

    // const data = await ( await fetch(PRODUCTION_HOST + `testRequest`, requestOptions)).json(); // FOR TEST REQUEST
    if (data.status === 200) {
      if ((data.xmlString).includes("Length error")) {
        console.log("Length error") // TODO: prepare state for it and dispaly it in the component
      } else {
        setDiagram(data.xmlString)
        setTimeout(() => setApiNumber(prev => prev + 1), 500);
      }
    }
    else {
      setRequestStatus(requestStates.ERROR);
    }
  }

  async function resendRequestToChatGPT(message) {
    setRequestStatus(requestStates.WAITING_RESEND);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_text: message,
        items_number: itemValue,
        temperature: temperatureValue,
        frequency_penalty: frequencyPenalty,
        regenerate_answer: regenerateAnswer
      }),
    };

    // LOCAL
    // const data = await ( await fetch(LOCAL_HOST + `testRequest`, requestOptions)).json(); // FOR TEST REQUEST
    // const data = await (await fetch(LOCAL_HOST + `openairegenerate`, requestOptions)).json(); // FOR LOCAL OPEN AI TESTING
    // PRODUCTION
    const data = await ( await fetch(PRODUCTION_HOST + `openairegenerate`, requestOptions)).json(); // FOR LOCAL OPEN AI TESTING
    // const data = await ( await fetch(PRODUCTION_HOST + `testRequest`, requestOptions)).json(); // FOR TEST REQUEST

    console.log(data.xmlString)

    if (data.message !== "Internal Server Error") {
      setDiagram(data.xmlString)
      setTimeout(() => setApiNumber(prev => prev + 1), 500);
    }
    else {
      setRequestStatus(requestStates.ERROR);
    }
  }

  return (
    <Box className="formComponent-contact">

      <Box className="contact-content">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} ref={form}>
              <Box
                display="grid"
                gap="15px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                sx={{ "& > div": "span 4" }}
              >
                <Box sx={{ gridColumn: "span 4" }}>
                  <Tooltip title='Checkout EXAMPLES to find out how give a good prompts for model.'>
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "1.75vh",
                        fontWeight: "600",
                      }}
                    >
                      Type a quick description of business model:
                    </Typography>
                  </Tooltip>
                 
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={values.message === " " || values.message === ""  ? "ex. Small bakery in big town that generate money from delivering fresh breadstuff to clients houses." : "Describtion"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="message"
                  sx={{ gridColumn: "span 4", maxHeight: "20vh" }}
                  multiline={true}
                  maxRows={3}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="primary" variant="contained">
                  Wyślij
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default UserInput;

const initialValues = {
  message: " ",
};

const userSchema = yup.object().shape({
  message: yup.string(),
});
