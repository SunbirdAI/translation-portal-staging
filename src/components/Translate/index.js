import {MainContainer} from "./Translate.styles";
import TranslateTextArea from "../TranslateTextArea";
import SamplePhrases from "../SamplePhrases";
import {useState} from "react";

const localLanguages = ['Acholi', 'Ateso', 'Luganda', 'Lugbara', 'Runyankole'];
const localLangString = localLanguages.join(" or ");

const sourceDropDownList = ['English', localLangString];

const getTargetDropdownList = (sourceLanguage) => {
    return sourceLanguage === localLangString ? ['English'] : localLanguages
}


const Translate = () => {
    const [sourceLanguage, setSourceLanguage] = useState('English');
    const [sourceText, setSourceText] = useState('');
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
            />
            <SamplePhrases setSamplePhrase={setSourceText}/>
        </MainContainer>
    );
};

export default Translate;
