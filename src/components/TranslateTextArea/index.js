import { LanguageDropdown, DropdownOption, TextArea, CharCount, ButtonContainer, OverlayContainer } from "./TranslateTextArea.styles";
import { Button, Snackbar, IconButton, Tooltip, Modal, Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Feedback from "../Feedback";
// import Typewriter from "../Typewriter";
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
    // const [typewriterText, setTypewriterText] = useState('');

    // useEffect(() => {
    //     if (disabled && translation !== null) {
    //         setTypewriterText(''); // Reset typewriter text
    //     }
    // }, [disabled, translation]);

    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const onLanguageChange = (event) => {
        if (!disabled) {
            setSourceLanguage(event.target.value);
            setAutoDetected(event.target.value === 'auto-detection');
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

            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="success" />
            </Stack>}

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
