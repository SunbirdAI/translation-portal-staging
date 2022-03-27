import {LanguageDropdown, TextArea} from "./TranslateTextArea.styles";


const TranslateTextArea = ({
                               placeholder,
                               disabled,
                               dropDownList,
                               setSourceLanguage,
                               text,
                               translation,
                               setText
                           }) => {
    const onLanguageChange = (event) => {
        if (!disabled)
            setSourceLanguage(event.target.value);
    }

    const onTextChange = (event) => {
        setText(event.target.value);
    }

    return (
        <div className={disabled ? "bg-gray-100" : "bg-white"}>
            <LanguageDropdown onChange={onLanguageChange}>
                {dropDownList.map((language, index) =>
                    <option key={index} value={language}>{language}</option>
                )}
            </LanguageDropdown>
            <TextArea
                placeholder={placeholder}
                disabled={disabled}
                readonly={disabled}
                value={disabled ? translation : text}
                onChange={onTextChange}
            >
            </TextArea>
        </div>
    );
};

export default TranslateTextArea;
