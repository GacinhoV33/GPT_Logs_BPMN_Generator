import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { requestHandler } from "../utils";

const LOCAL_HOST = "127.0.0.1:5000";
const API_ADRESS = LOCAL_HOST;

const UserInput = ({ setShowWaiting }) => {
  async function sendRequestToChatGPT(message) {
    setShowWaiting(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      // TODO - configure body request
    };
    const openAIRequest = fetch(API_ADRESS, requestOptions);
    const xmlData = await requestHandler(openAIRequest);
    setTimeout(() => setShowWaiting(false), 3500); // After correct implement delete it
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
