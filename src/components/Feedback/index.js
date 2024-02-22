import { useEffect, useRef, useState } from "react";
import { Alert, Button } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { sendFeedback } from "../../API";

const Feedback = ({ sourceText, translation, from, to }) => {
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(0); // 0 -> unrated, 1 -> good, 2 -> bad.
  const [showAlert, setShowAlert] = useState(false);
  const prevText = useRef();
  const [correctTranslation, setCorrectTranslation] = useState('');
  const [showCorrectTranslation, setShowCorrectTranslation] = useState(false);
  const [username, setUsername] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  useEffect(() => {
    if (prevText.current !== translation) {
      setRated(false);
      setRating(0);
    }
    prevText.current = translation;
  }, [translation]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false);
    }, 1500);

    return () => clearTimeout(timeId);
  }, [showAlert])

  const handleSubmit = async (isGood) => {
    setRated(true);
    setRating(isGood ? 1 : 2);
    setShowAlert(true);
    try {
      await sendFeedback(isGood ? 'Good' : 'Bad', correctTranslation, username, sourceText, translation, from, to);
      setCorrectTranslation(''); // Clear correctTranslation area
      setUsername(''); // Clear username area
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <p className="m-2">Please help us improve the translation quality with your feedback.</p>
      <div className="grid grid-cols-2 m-2 gap-2">
        <Button
          variant={rating === 1 ? "contained" : "outlined"}
          disabled={rated || translation === ''}
          endIcon={<ThumbUp />}
          onClick={() => {
            handleSubmit(true);
            setShowUsernameInput(false); // Show the username input
            setShowCorrectTranslation(false); // Show the correct translation text area
          }}
        >
          Good translation
        </Button>
        <Button
          disabled={rated || translation === ''}
          variant={rating === 2 ? "contained" : "outlined"}
          endIcon={<ThumbDown />}
          onClick={() => {
            setShowUsernameInput(true); // Show the username input
            setShowCorrectTranslation(true); // Show the correct translation text area
            
          }}
        >
          Bad translation
        </Button>
      </div>
      {showAlert && <Alert severity="success">Thanks for the feedback</Alert>}
      <div className="flex gap-4">
        {showCorrectTranslation && (
          <textarea
            className="flex-1 mb-2"
            placeholder="Enter correct translation"
            value={correctTranslation}
            onChange={(e) => setCorrectTranslation(e.target.value)}
          />
        )}
        {showUsernameInput && (
          <input
            type="text"
            className="flex-1 mb-2"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        {showCorrectTranslation && (
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(false)} // Submit feedback when this button is clicked
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;