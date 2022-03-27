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
    const [sourceLanguage, setSourceLanguage] = useState('English')
    return (
        <MainContainer>
            <TranslateTextArea
                placeholder="Enter text"
                dropDownList={sourceDropDownList}
                setSourceLanguage={setSourceLanguage}/>
            <TranslateTextArea
                placeholder="Translation"
                disabled={true}
                dropDownList={getTargetDropdownList(sourceLanguage)}
            />
            <SamplePhrases/>
        </MainContainer>
    );
};

export default Translate;
