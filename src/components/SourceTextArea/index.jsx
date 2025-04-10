import React, { useEffect, useState } from "react";
import {
  TextArea,
  TranslateFooter,
} from "../TranslateTextArea/TranslateTextArea.styles";
import { Alert, Snackbar } from "@mui/material";

const SourceTextArea = ({ text, setText }) => {
  const MAX_CHAR_COUNT = 5000;

  const [charCount, setCharCount] = useState(0);
  const [open, setOpen] = React.useState(false);

  //handle closing of snack bar for character limit
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //handle opening and closing of snack bar for character limit
  useEffect(() => {
    if (charCount >= MAX_CHAR_COUNT) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [charCount]);

  //set the character count when the text changes
  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  //onChange Function
  const onTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= MAX_CHAR_COUNT) {
      setText(newText);
      setCharCount(newText.length);
    } else {
      setText(newText.slice(0, MAX_CHAR_COUNT));
    }
  };

  return (
    <>
      <TextArea
        placeholder={"Enter text"}
        onChange={onTextChange}
        value={text}
        rows={"5"}
        maxLength={MAX_CHAR_COUNT}
      />

      <TranslateFooter>
        <p
          className={
            // disabled && "hidden"
            ` text-xs text-[#666] text-center align-text-bottom`
          }
        >
          {charCount}/{MAX_CHAR_COUNT} characters
        </p>
      </TranslateFooter>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="warning"
          // variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          Your text has reached the 5,000 character limit.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SourceTextArea;
