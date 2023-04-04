import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";


function sendRequestToChatGPT(){
    console.log("This functions should be placed in MainApp and it is responsible for sending request with message to chat-gpt API")
}

const UserInput = () => {
  const [userMessage, setUserMessage] = useState("");
  const form = useRef();

  function handleSubmit(values) {
    setUserMessage(values.message);
  }

  useEffect(() => {
    sendRequestToChatGPT()
  }, [userMessage])

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
                <Box sx={{gridColumn: 'span 4'}}>
                    <Typography style={{display: 'flex', justifyContent: 'center', fontSize: '1.75vh', fontWeight: '600'}}>
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
                  sx={{ gridColumn: "span 4", maxHeight: '20vh' }}
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
