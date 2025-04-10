import React, { useState } from "react";
import {
  ButtonContainer,
  TextArea,
  TranslateFooter,
} from "../TranslateTextArea/TranslateTextArea.styles";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Modal,
  Snackbar,
  Stack,
  Tooltip,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import FeedbackImage from "../../images/feedback.png";
import Feedback from "../Feedback";

const TargetTextArea = ({
  translation,
  text,
  isLoading,
  sourceLanguage,
  targetLanguage,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  //Saved translation to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translation);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // Handle feedback modal open and close
  const handleFeedbackOpen = () => setFeedbackOpen(true);
  const handleFeedbackClose = () => setFeedbackOpen(false);

  return (
    <>
      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" data-testid="loading-indicator" />
        </Stack>
      )}
      <TextArea
        placeholder={"Translation"}
        disabled
        readOnly
        value={translation}
      />
      <TranslateFooter>
        {translation && (
          <>
            <Tooltip title="Provide Feedback" data-testid="feedback-button">
              <button
                onClick={handleFeedbackOpen}
                className={`w-10 h-10 hover:opacity-50 disabled:opacity-50`}
              >
                <img
                  src={FeedbackImage}
                  alt="Feedback"
                />
              </button>
            </Tooltip>
            <ButtonContainer data-testid="copy-container">
              <Button
                onClick={copyToClipboard}
                disabled={!translation}
                endIcon={<ContentCopy />}
                size="small"
              >
                Copy
              </Button>
            </ButtonContainer>
          </>
        )}
      </TranslateFooter>

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          // variant="filled"
          sx={{ width: "100%" }}
          //onClose={handleClose}
        >
          Translation copied!
        </Alert>
      </Snackbar>

      <Modal open={feedbackOpen} onClose={handleFeedbackClose}>
        <Box sx={modalStyle}>
          <Feedback
            sourceText={text}
            translation={translation}
            from={sourceLanguage}
            to={targetLanguage}
          />
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default TargetTextArea;
