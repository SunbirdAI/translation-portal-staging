import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MainContainer,
  SplitContainer,
  SwapperContainer,
  SwapperIcon,
} from "./Translate.styles";
import TranslateTextArea from "../TranslateTextArea";
import SourceTextArea from "../SourceTextArea";
import SamplePhrases from "../SamplePhrases";
import TargetTextArea from "../TargetTextArea";
import { translateSB } from "../../API";
import { Alert, Snackbar, Tooltip } from "@mui/material";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import { localLangOptions } from "../../languagesConstants";

const Translate = () => {
  const [sourceLanguage, setSourceLanguage] = useState("eng");
  const [targetLanguage, setTargetLanguage] = useState("lug");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [swap, setSwap] = useState(false);
  const [error, setError] = useState(false);

  // Close error snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setError(false);
  };

  const findLanguage = (languageCode) => {
    return localLangOptions.find((option) => option.value === languageCode)
      ?.label;
  };

  // Refs for tracking
  const prevTargetRef = useRef(targetLanguage);
  const isComponentMounted = useRef(true);

  // Translation Logic
  const translate = useCallback(
    async (text) => {
      setTranslation("");
      // Prevent translation if no text or source language is auto
      if (!text || text.trim() === "") {
        setIsLoading(false);
        return;
      }

      if (sourceLanguage === null || targetLanguage === null) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const result = await translateSB(text, sourceLanguage, targetLanguage);

        if (isComponentMounted.current) {
          if (result === "Try again") {
            setError(true);
            return;
          }
          setTranslation(result);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTranslation("Translation failed");
      } finally {
        if (isComponentMounted.current) {
          setIsLoading(false);
        }
      }
    },
    [sourceLanguage, targetLanguage]
  );

  // Trigger translation when relevant states change
  useEffect(() => {
    // Reset translation if target language changes
    if (prevTargetRef.current !== targetLanguage) {
      setTranslation("");
    }
    prevTargetRef.current = targetLanguage;

    // Debounce translation
    const timeoutId = setTimeout(() => translate(text), 500);
    return () => clearTimeout(timeoutId);
  }, [text, targetLanguage, sourceLanguage, translate]);

  return (
    <div className="h-fit">
      <MainContainer>
        {sourceLanguage !== null && targetLanguage !== null && (
          <SwapperContainer>
            <p>{findLanguage(sourceLanguage)}</p>
            <Tooltip title="Swap languages" data-testid="swap-languages">
              <SwapperIcon
                onClick={() => {
                  setSwap(true);
                  setText(translation);
                  setTranslation("");
                }}
              >
                <SwapHorizontalCircleOutlinedIcon color="inherit" />
              </SwapperIcon>
            </Tooltip>
            <p>{findLanguage(targetLanguage)}</p>
          </SwapperContainer>
        )}
        <SplitContainer>
          <TranslateTextArea
            type="source"
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            swap={swap}
            setSwap={setSwap}
            data-testid="source-language"
          >
            <SourceTextArea text={text} setText={setText} />
          </TranslateTextArea>
          <Tooltip
            title="Swap languages"
            data-testid="swap-languages"
            className="lg:flex hidden"
            placement="top"
          >
            <SwapperIcon
              onClick={() => {
                setSwap(true);
                setText(translation);
                setTranslation("");
              }}
            >
              <SwapHorizontalCircleOutlinedIcon color="inherit" />
            </SwapperIcon>
          </Tooltip>

          <TranslateTextArea
            type="target"
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            swap={swap}
            setSwap={setSwap}
            data-testid="translation"
          >
            <TargetTextArea
              translation={translation}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              isLoading={isLoading}
            />
          </TranslateTextArea>
        </SplitContainer>

        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
            Translation failed. Please try again.
          </Alert>
        </Snackbar>
        <SamplePhrases
          sourceLanguage={sourceLanguage === null ? "auto" : sourceLanguage}
          setSamplePhrase={setText}
        />
      </MainContainer>
    </div>
  );
};

export default Translate;
