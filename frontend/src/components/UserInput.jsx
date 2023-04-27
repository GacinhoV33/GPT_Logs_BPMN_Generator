import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { requestHandler } from "../utils";

const LOCAL_HOST = "http://127.0.0.1:5000/";

const UserInput = ({
  setShowWaiting,
  itemValue,
  temperatureValue,
  frequencyPenalty,
  diagram,
  setDiagram,
  setApiNumber,
}) => {
  async function sendRequestToChatGPT(message) {
    setShowWaiting(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_text: message,
        items_number: itemValue,
        temperature: temperatureValue,
        frequency_penalty: frequencyPenalty
      }),
    };

    const data = await ( await fetch(LOCAL_HOST + `testRequest`, requestOptions)).json(); // FOR TEST REQUEST
    // const data = await ( await fetch(LOCAL_HOST + `openai`, requestOptions)).json(); // FOR LOCAL OPEN AI TESTING
    setDiagram(data.xmlString);
    setTimeout(() => setApiNumber(prev => prev+1), 500); // After correct implement delete it
    setShowWaiting(false);
  }
  const form = useRef();

  function handleSubmit(values) {
    sendRequestToChatGPT(values.message);
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
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="message"
                  sx={{ gridColumn: "span 4", maxHeight: "20vh" }}
                  multiline={true}
                  maxRows={3}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
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
