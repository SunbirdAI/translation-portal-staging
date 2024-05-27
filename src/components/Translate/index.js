import { MainContainer, Note, CloseButton } from "./Translate.styles";
import TranslateTextArea from "../TranslateTextArea";
import SamplePhrases from "../SamplePhrases";
import { useEffect, useRef, useState, useCallback } from "react";
import { debounce } from 'lodash';
import { languageId, translateSB, sendFeedback, textToSpeech } from "../../API";

const localLangOptions = [
    { label: 'English', value: 'eng' },
    { label: 'Luganda', value: 'lug' },
    { label: 'Acholi', value: 'ach' },
    { label: 'Ateso', value: 'teo' },
    { label: 'Lugbara', value: 'lgg' },
    { label: 'Runyankole', value: 'nyn' }
];

const autoOption = [{ label: 'Auto detection', value: 'auto-detection' }];
const sourceOptions = [...autoOption, ...localLangOptions];
// const getTargetOptions = () => localLangOptions;

const getTargetOptions = (sourceLanguage) => {
    // Filter out the selected source language from all available options
    return localLangOptions.filter(option => option.value !== sourceLanguage);
};

const Translate = () => {
    const [sourceLanguage, setSourceLanguage] = useState('eng');
    const [targetLanguage, setTargetLanguage] = useState(localLangOptions[1].value);
    const [sourceText, setSourceText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [showNote, setShowNote] = useState(true);
    const prevTarget = useRef();
    const isMounted = useRef(false);
    const isComponentMounted = useRef(true);

    useEffect(() => {
        return () => {
            isComponentMounted.current = false;
        };
    }, []);

    const handleTextToSpeech = async () => {
        setIsLoading(true);
        try {
            await textToSpeech(translation);
        } catch (e) {
            console.error(e);
        }
        if (isComponentMounted.current) {
            setIsLoading(false);
        }
    };

    const detectLanguage = useCallback(debounce(async (text) => {
        if (text === '') {
            setSourceLanguage('eng');
            return;
        }
        try {
            const detectedLanguage = await languageId(text);
            if (isComponentMounted.current) {
                setDetectedLanguage(detectedLanguage);
                setSourceLanguage(detectedLanguage);
                if (detectedLanguage === targetLanguage) {
                    setTranslation("Detected language is the same as the target language.")
                    console.error("Detected language is the same as the target language.");
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, 1000), [targetLanguage]);

    useEffect(() => {
        detectLanguage(sourceText);
    }, [sourceText, detectLanguage]);

    const translate = useCallback(async (source) => {
        if (source === '') {
            setTranslation('');
            setIsLoading(false);
            return;
        }
        try {
            const result = await translateSB(source, sourceLanguage, targetLanguage);
            if (isComponentMounted.current) {
                setTranslation(result);
            }
        } catch (e) {
            if (isComponentMounted.current) {
                setTranslation('');
            }
            console.error(e);
        }
        if (isComponentMounted.current) {
            setIsLoading(false);
        }
    }, [sourceLanguage, targetLanguage]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        if (prevTarget.current !== targetLanguage) setTranslation('');
        setIsLoading(true);
        prevTarget.current = targetLanguage;
        const timeOutId = setTimeout(() => translate(sourceText), 5000);
        sendFeedback(' ', sourceText, translation, sourceLanguage, targetLanguage);
        return () => clearTimeout(timeOutId);
    }, [sourceText, targetLanguage, sourceLanguage, translate, translation]);

    return (
        <div>
            {showNote && (
                <Note>
                    <strong>Note:</strong> Our auto language detection currently supports the following languages: English, Luganda, Acholi, Ateso, Lugbara, and Runyankole.
                    We are actively working on improving this feature and adding support for more languages in the future.
                    <CloseButton onClick={() => setShowNote(false)}>✖</CloseButton>
                </Note>
            )}
            <MainContainer>
                <TranslateTextArea
                    placeholder="Enter text"
                    dropDownOptions={sourceOptions}
                    setSourceLanguage={setSourceLanguage}
                    text={sourceText}
                    setText={setSourceText}
                    detectedLanguage={detectedLanguage}
                />
                <TranslateTextArea
                    placeholder="Translation"
                    disabled={true}
                    dropDownOptions={getTargetOptions(sourceLanguage)}
                    setTargetLanguage={setTargetLanguage}
                    translation={translation}
                    text={sourceText}
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    isLoading={isLoading}
                    handleTextToSpeech={handleTextToSpeech}
                    showCopyButton={true}
                />
                <SamplePhrases sourceLanguage={sourceLanguage} setSamplePhrase={setSourceText} />
            </MainContainer>
        </div>
    );
};

export default Translate;
