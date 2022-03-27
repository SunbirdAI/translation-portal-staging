import {LanguageDropdown, TextArea} from "./TranslateTextArea.styles";
import {useState} from "react";


const TranslateTextArea = ({placeholder, disabled, dropDownList, setSourceLanguage}) => {
    const onChange = (event) => {
        if(!disabled)
            setSourceLanguage(event.target.value);
    }
    return (
        <div className={disabled ? "bg-gray-100" : "bg-white"}>
            <LanguageDropdown onChange={onChange}>
                {dropDownList.map((language, index) =>
                    <option key={index} value={language}>{language}</option>
                )}
            </LanguageDropdown>
            <TextArea
                placeholder={placeholder}
                disabled={disabled}
                readonly={disabled}
            >
                {}
            </TextArea>
        </div>
    );
};

export default TranslateTextArea;
