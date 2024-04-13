import { LanguageDropdown, TextArea } from "./TranslateTextArea.styles";
import { Button, LinearProgress, Snackbar } from "@mui/material";
import Feedback from "../Feedback";
import { VolumeUp, ContentCopy } from "@mui/icons-material";
import React, { useState } from 'react';

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
    handleTextToSpeech
}) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const onLanguageChange = (event) => {
        if (!disabled) {
            setSourceLanguage(event.target.value);
        } else setTargetLanguage(event.target.value);
    }

    const onTextChange = (event) => {
        setText(event.target.value);
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(translation);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    }

    return (
        <div className={disabled ? "bg-gray-100 shadow" : "bg-white shadow"}>
            <LanguageDropdown onChange={onLanguageChange}>
                {dropDownOptions.map((option, index) =>
                    <option key={index} value={option.value}>{option.label}</option>
                )}
            </LanguageDropdown>
            <TextArea
                placeholder={placeholder}
                disabled={disabled}
                readOnly={disabled}
                value={disabled ? translation : text}
                onChange={onTextChange}
            />
            {isLoading && disabled && <LinearProgress color="secondary" />}
            {!isLoading && targetLanguage === "lug" && <Button
                disabled={translation === ''}
                endIcon={<VolumeUp />}
                onClick={() => handleTextToSpeech()}
            >
                <span className="italic text-xs"> (BETA) </span>
            </Button>
            }
            {disabled && <Button
                onClick={copyToClipboard}
                disabled={!translation}
                endIcon={<ContentCopy />}
                size="small"
                style={{ marginLeft: 'auto' }}
            >
                Copy
            </Button>}
            {disabled && <Feedback
                sourceText={text}
                translation={translation}
                from={sourceLanguage}
                to={targetLanguage}
            />}
            <Snackbar
                open={copySuccess}
                autoHideDuration={3000}
                message="Translation copied!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />
        </div>
    );
};

export default TranslateTextArea;