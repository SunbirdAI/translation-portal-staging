import { LanguageDropdown, DropdownOption, TextArea, ResponsiveContainer, CharCount, ButtonContainer } from "./TranslateTextArea.styles";
import { Button, LinearProgress, Snackbar } from "@mui/material";
import Feedback from "../Feedback";
import { VolumeUp, ContentCopy } from "@mui/icons-material";
import React, { useState, useEffect } from 'react';

// Language code mapping
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

    useEffect(() => {
        setCharCount(text.length);
    }, [text]);

    const onLanguageChange = (event) => {
        if (!disabled) {
            setSourceLanguage(event.target.value);
            if (event.target.value === 'auto-detection') {
                setAutoDetected(true)
                console.log("Auto detect on")
            } else {
                setAutoDetected(false)
                console.log("auto detect off")
            }
            console.log(event.target.value)
        } else setTargetLanguage(event.target.value);
    }

    const onTextChange = (event) => {
        const newText = event.target.value;
        if (charCountLimit && newText.length <= MAX_CHAR_COUNT) {
            setText(newText);
            setCharCount(newText.length);
        } else {
            setText(newText);
        }
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
        <ResponsiveContainer disabled={disabled}>
            <LanguageDropdown onChange={onLanguageChange} value={disabled ? targetLanguage : sourceLanguage}>
                {dropDownOptions.map((option, index) => (
                    <DropdownOption key={index} value={option.value}>
                        {option.label}
                    </DropdownOption>
                ))}
            </LanguageDropdown>

            {autoDetected && detectedLanguage && (
                <small className="italic text-xs text-blue-600">
                    Detected : {languageNames[detectedLanguage]}
                </small>
            )}

            <TextArea
                placeholder={placeholder}
                disabled={disabled}
                readOnly={disabled}
                value={disabled ? translation : text}
                onChange={onTextChange}
            />

            {charCountLimit && (
                <CharCount>
                    {charCount}/{MAX_CHAR_COUNT} characters
                </CharCount>
            )}

            {isLoading && disabled && <LinearProgress color="secondary" />}

            {/* {!isLoading && targetLanguage === "lug" && (
                <Button
                    disabled={translation === ''}
                    endIcon={<VolumeUp />}
                    onClick={handleTextToSpeech}
                    className="mt-2"
                >
                    <span className="italic text-xs">(BETA)</span>
                </Button>
            )} */}

            {disabled && (
                <>
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

                    <Feedback
                        sourceText={text}
                        translation={translation}
                        from={sourceLanguage}
                        to={targetLanguage}
                    />
                </>
            )}

            <Snackbar
                open={copySuccess}
                autoHideDuration={3000}
                message="Translation copied!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />
        </ResponsiveContainer>
    );
};

export default TranslateTextArea;

