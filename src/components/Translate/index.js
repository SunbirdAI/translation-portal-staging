import {MainContainer} from "./Translate.styles";
import TranslateTextArea from "../TranslateTextArea";
import SamplePhrases from "../SamplePhrases";
import {useEffect, useState} from "react";
import {getTranslation} from "../../API";

const localLanguages = ['Acholi', 'Ateso', 'Luganda', 'Lugbara', 'Runyankole'];
const localLangString = localLanguages.join(" or ");

const sourceDropDownList = ['English', localLangString];

const getTargetDropdownList = (sourceLanguage) => {
    return sourceLanguage === localLangString ? ['English'] : localLanguages
}


const Translate = () => {
    const [sourceLanguage, setSourceLanguage] = useState('English');
    const [sourceText, setSourceText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const translate = async (source) => {
        if(source.length < 15) {
            setTranslation(isLoading ? '...' : '');
            return;
        }
        const result = await getTranslation(source);
        setTranslation(result);
        setIsLoading(false);
    }
    useEffect(() => {
        setIsLoading(true);
        const timeOutId = setTimeout(() => translate(sourceText), 500);
        // if (sourceText.length >= 15) {
        //     setIsLoading(true);
        //     setTranslation(t => t + ' ...');
        //     translate(sourceText);
        // }
        return () => clearTimeout(timeOutId);
    }, [sourceText]);

    useEffect(() => {
        if (isLoading) setTranslation(t => t + ' ...');
    }, [isLoading]);
    return (
        <MainContainer>
            <TranslateTextArea
                placeholder="Enter text"
                dropDownList={sourceDropDownList}
                setSourceLanguage={setSourceLanguage}
                text={sourceText}
                setText={setSourceText}
            />
            <TranslateTextArea
                placeholder="Translation"
                disabled={true}
                dropDownList={getTargetDropdownList(sourceLanguage)}
                translation={translation}
            />
            <SamplePhrases setSamplePhrase={setSourceText}/>
        </MainContainer>
    );
};

export default Translate;
