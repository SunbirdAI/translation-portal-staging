import { LanguageDropdown, DropdownOption, TextArea, CharCount, ButtonContainer, OverlayContainer } from "./TranslateTextArea.styles";
import { Button, LinearProgress, Snackbar, IconButton, Tooltip, Modal, Box } from "@mui/material";
import Feedback from "../Feedback";
// import Typewriter from "typewriter-effect";
import Typewriter from "../Typewriter";
import { ContentCopy, Feedback as FeedbackIcon } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';

const languageNames = {
    eng: 'English',
    lug: 'Luganda',
    ach: 'Acholi',
    teo: 'Ateso',
    lgg: 'Lugbara',
    nyn: 'Runyankole',
    l_n_d: 'language not detected'
};

const MAX_CHAR_COUNT = 5000;

const TranslateTextArea = ({
    placeholder,
    disabled,
    dropDownOptions,
    setSourceLanguage,
    setTargetLanguage,
    text,
    translation,
    setText,
    sourceLanguage,
    targetLanguage,
    isLoading,
    detectedLanguage,
    setAutoDetected,
    autoDetected,
    charCountLimit
}) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');

    useEffect(() => {
        if (disabled && translation !== null) {
            setTypewriterText(''); // Reset typewriter text
        }
    }, [disabled, translation]);

    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const onLanguageChange = (event) => {
        if (!disabled) {
            setSourceLanguage(event.target.value);
            if (event.target.value === 'auto-detection') {
                setAutoDetected(true);
                console.log("Auto detect on");
            } else {
                setAutoDetected(false);
                console.log("Auto detect off");
            }
            console.log(event.target.value);
        } else {
            setTargetLanguage(event.target.value);
        }
    };

    const onTextChange = (event) => {
        const newText = event.target.value;
        if (charCountLimit && newText.length <= MAX_CHAR_COUNT) {
            setText(newText);
            setCharCount(newText.length);
        } else {
            setText(newText);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(translation);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const handleFeedbackOpen = () => setFeedbackOpen(true);
    const handleFeedbackClose = () => setFeedbackOpen(false);

    return (
        <div className="relative p-4 bg-white shadow-md rounded-lg w-full flex flex-col items-start">
            <OverlayContainer>
                <div className="flex items-center w-full">
                    <LanguageDropdown defaultValue="auto-detection" onChange={onLanguageChange} value={disabled ? targetLanguage : sourceLanguage}>
                        {dropDownOptions.map((option, index) => (
                            <DropdownOption key={index} value={option.value}>
                                {option.label}
                            </DropdownOption>
                        ))}
                    </LanguageDropdown>
                    {disabled && (
                        <Tooltip title="Provide Feedback">
                            <IconButton onClick={handleFeedbackOpen} sx={{ ml: 2 }}>
                                <FeedbackIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>

                {disabled && (
                    <div className="flex items-center">
                        <ButtonContainer>
                            <Button
                                onClick={copyToClipboard}
                                disabled={!translation}
                                endIcon={<ContentCopy />}
                                size="small"
                            >
                                Copy
                            </Button>
                        </ButtonContainer>
                    </div>
                )}
            </OverlayContainer>

            {autoDetected && detectedLanguage && (
                <small className="italic text-xs text-blue-600">
                    Detected : {languageNames[detectedLanguage]}
                </small>
            )}

            {/* {disabled && translation !== null ? (
                <Typewriter
                    text={translation}
                    delay={100}
                    infinite={false}
                    onUpdate={setTypewriterText}
                />
            ) :
                <TextArea
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={disabled}
                    value={disabled ? typewriterText : text}
                    onChange={onTextChange}
                    rows={disabled ? undefined : '5'}
                />}
            <Typewriter text={"translation"} delay={100} /> */}
            {/* <div className="App">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(disabled ? <Typewriter text={translation} delay={100} infinite /> : text)
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString("Welcomes You")
                            .start();
                    }}
                />
            </div> */}
            <TextArea
                placeholder={placeholder}
                disabled={disabled}
                readOnly={disabled}
                value={disabled ? translation : text}
                onChange={onTextChange}
                rows={disabled ? undefined : '5'}
            />

            {charCountLimit && (
                <CharCount>
                    {charCount}/{MAX_CHAR_COUNT} characters
                </CharCount>
            )}

            {isLoading && disabled && <LinearProgress color="secondary" />}

            <Snackbar
                open={copySuccess}
                autoHideDuration={3000}
                message="Translation copied!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />

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
        </div>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default TranslateTextArea;
