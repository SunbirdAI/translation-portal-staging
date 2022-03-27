import {LanguageDropdown, TextArea} from "./Translate.styles";

const Translate = ({placeholder, disabled}) => (
    <div className={disabled ? "bg-gray-100" : "bg-white"}>
        <LanguageDropdown>
            <option value="1">English</option>
            <option value="2">Luganda, Runyankole</option>
            <option value="3">Three</option>
        </LanguageDropdown>
        <TextArea
            placeholder={placeholder}
            disabled={disabled}
            readonly={disabled}
        >
        </TextArea>
    </div>
);

export default Translate;
