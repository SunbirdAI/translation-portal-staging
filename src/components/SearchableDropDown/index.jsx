import React, { useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { localLangOptions } from "../../languagesConstants";

const LanguageDropdown = ({
  type = "source",
  targetLanguage,
  sourceLanguage,
  setSourceLanguage,
  setTargetLanguage,
  swap = false,
}) => {
  // Use intial value from props
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);

  // Filter options to exclude the language selected in other dropdown
  const filteredOptions = localLangOptions.filter((option) => {
    if (type === "source" && targetLanguage) {
      return option.value !== targetLanguage;
    } else if (type === "target" && sourceLanguage) {
      return option.value !== sourceLanguage;
    }
    return true;
  });

  // Handle language selection change
  const handleLanguageChange = (event, value) => {
    const newLanguage = value ? value.value : null;
    setSelectedLanguage(newLanguage);

    // Update parent state based on type
    if (type === "source") {
      setSourceLanguage(newLanguage);

      // clear target language if it is the same as source
      if (newLanguage === targetLanguage) {
        setTargetLanguage(null);
      }
    } else if (type === "target") {
      setTargetLanguage(newLanguage);

      // clear source language if it is the same as target
      if (newLanguage === sourceLanguage) {
        setSourceLanguage(null);
      }
    }

    console.log(`Selected ${type} language:`, newLanguage);
  };

  // Handle swap separately to ensure distinct values
  useEffect(() => {
    if (swap) {
      if (type === "source" && targetLanguage !== null) {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setSelectedLanguage(targetLanguage);
      } else if (type === "target" && sourceLanguage !== null) {
        setTargetLanguage(sourceLanguage);
        setSourceLanguage(targetLanguage);
        setSelectedLanguage(sourceLanguage);
      }
    }
  }, [swap]);

  // Update internal state when props change (from parent)
  useEffect(() => {
    if (type === "source" && sourceLanguage !== selectedLanguage) {
      setSelectedLanguage(sourceLanguage);
    } else if (type === "target" && targetLanguage !== selectedLanguage) {
      setSelectedLanguage(targetLanguage);
    }
  }, [sourceLanguage, targetLanguage, type, selectedLanguage]);

  // Find the selected option object
  const selectedOption =
    localLangOptions.find((option) => option.value === selectedLanguage) ||
    null;

  return (
    <Autocomplete
      id={`${type}-language-select`}
      options={filteredOptions}
      autoHighlight
      value={selectedOption}
      getOptionLabel={(option) => option.label}
      onChange={handleLanguageChange}
      data-testid="language-dropdown"
      renderInput={(params) => (
        <TextField
          data-testid="dropdown-option"
          {...params}
          label={`Select ${type} language`}
          slotProps={{
            ...params.InputProps,
            autoComplete: "new-password", // disables browser autofill
          }}
        />
      )}
      sx={{ minWidth: 230 }}
    />
  );
};

export default LanguageDropdown;
