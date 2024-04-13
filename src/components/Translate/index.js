import {MainContainer} from "./Translate.styles";
import TranslateTextArea from "../TranslateTextArea";
import SamplePhrases from "../SamplePhrases";
import {useEffect, useRef, useState, useCallback} from "react";
import {translateSB, sendFeedback, textToSpeech} from "../../API";

const localLangOptions = [
    {
        label: 'Luganda',
        value: 'lug'
    },
    {
        label: 'Acholi',
        value: 'ach'
    },
    {
        label: 'Ateso',
        value: 'teo'
    },
    {
        label: 'Lugbara',
        value: 'lgg'
    },
    {
        label: 'Runyankole',
        value: 'nyn'
    }
]

const englishOption = [{
    label: 'English',
    value: 'eng'
}]

const sourceOptions = [
    ...englishOption,
    ...localLangOptions
];

// const getTargetOptions = (sourceLanguage) => {
//     return sourceLanguage === 'English' ? localLangOptions : englishOption
// }

const getTargetOptions = (sourceLanguage) => {
    // Filter out the selected source language from all available options
    return sourceOptions.filter(option => option.value !== sourceLanguage);
};

const Translate = () => {
    const [sourceLanguage, setSourceLanguage] = useState('eng');
    const [targetLanguage, setTargetLanguage] = useState(localLangOptions[0].value);
    const [sourceText, setSourceText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const prevTarget = useRef();
    const isMounted = useRef(false);

    useEffect(() => {
        if (sourceLanguage !== 'eng') setTargetLanguage('eng');
        else setTargetLanguage(localLangOptions[0].value);
    }, [sourceLanguage])

    const handleTextToSpeech = async () => {
        setIsLoading(true);
        try {
            await textToSpeech(translation)
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    // Inside your component
    const translate = useCallback(async (source) => {
        if (source === '') {
            setTranslation('');
            setIsLoading(false);
            return;
        }
        try {
            const result = await translateSB(source, sourceLanguage, targetLanguage);
            setTranslation(result);
        } catch (e) {
            setTranslation('');
            console.log(e);
        }
        setIsLoading(false);
    }, [sourceLanguage, targetLanguage]); // Dependencies needed for translate function

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
    }, [sourceText, targetLanguage, sourceLanguage, translate, translation]); // Include all necessary dependencies

    return (
        <MainContainer>
            <TranslateTextArea
                placeholder="Enter text"
                dropDownOptions={sourceOptions}
                setSourceLanguage={setSourceLanguage}
                text={sourceText}
                setText={setSourceText}
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

            <SamplePhrases sourceLanguage={sourceLanguage} setSamplePhrase={setSourceText}/>
        </MainContainer>
    );
};

export default Translate;