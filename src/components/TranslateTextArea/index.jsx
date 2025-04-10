import React from "react";
import LanguageDropdown from "../SearchableDropDown";
import { OverlayContainer } from "../TranslateTextArea/TranslateTextArea.styles";

const TranslateTextArea = ({
  type = "source",
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
  swap,
  children,
}) => {
  return (
    <div className="relative p-4 bg-white border rounded-md w-full flex flex-col items-start h-fit">
      <OverlayContainer>
        <LanguageDropdown
          type={type}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          setSourceLanguage={setSourceLanguage}
          setTargetLanguage={setTargetLanguage}
          swap={swap}
          data-testid="language-dropdown"
        />
      </OverlayContainer>
      {children}
    </div>
  );
};

export default TranslateTextArea;
