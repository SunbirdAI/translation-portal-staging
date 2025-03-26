import pRetry from "p-retry";

const FEEDBACK_URL = import.meta.env.VITE_FEEDBACK_URL;
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;
export const tracking_id = import.meta.env.VITE_GA4_TRACKING_ID;

const languageIdUrl = `${import.meta.env.VITE_SB_API_URL}/tasks/classify_language`;
const translationUrl = `${import.meta.env.VITE_SB_API_URL}/tasks/nllb_translate`;
const textToSpeechUrl =
  "https://api-inference.huggingface.co/models/Sunbird/sunbird-lug-tts";

const requestHeaders = {
  Authorization: `Bearer ${import.meta.env.VITE_SB_API_TOKEN}`,
  "Content-Type": "application/json",
};

export const languageId = async (text) => {
  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({ text }),
  };

  try {
    const response = await fetch(languageIdUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const responseJson = await response.json();
    const detectedLanguage = responseJson.language;
    console.log("detectedLanguage: " + detectedLanguage);
    return detectedLanguage;
  } catch (err) {
    console.error(err);
    return "language not detected";
  }
};

export const getTranslation = async (text, sourceLang, targetLang) => {
  console.log(`sourceLang ${sourceLang}`);
  console.log(`targetLang ${targetLang}`);

  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      source_language: sourceLang,
      target_language: targetLang,
      text,
    }),
  };

  try {
    const response = await fetch(translationUrl, requestOptions);
    if (response.status === 422) {
        const responseJson = await response.json();
        console.error("Validation error:", responseJson);
        throw new Error(`${response.status} ${response.statusText}`);
      }
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const responseJson = await response.json();
    if (!responseJson || !responseJson.output) {
      throw new Error("Invalid response structure");
    }

    const translatedText = responseJson.output.translated_text;
    console.log(`translatedText ${translatedText}`);
    return translatedText;
  } catch (err) {
    console.error(err);
    return "Try again";
  }
};

export const sendFeedback = async (
  feedback,
  CorrectTranslation,
  username,
  sourceText,
  translation,
  from,
  to
) => {
  const time = Date.now();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Timestamp: time,
      feedback,
      SourceText: sourceText,
      LanguageFrom: from,
      LanguageTo: to,
      username,
      CorrectTranslation,
      TranslatedText: translation,
    }),
  };

  try {
    const response = await fetch(FEEDBACK_URL, requestOptions);
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getSpeech = async (text) => {
  const data = { inputs: text };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(textToSpeechUrl, requestOptions);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const reader = response.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });

    const responseBlob = new Response(stream);
    const url = window.URL.createObjectURL(await responseBlob.blob());
    window.audio = new Audio(url);
    await window.audio.play();
  } catch (err) {
    console.error(err);
  }
};

export const textToSpeech = async (text) => {
  await pRetry(() => getSpeech(text), {
    onFailedAttempt: (error) => {
      console.log(
        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
      );
    },
    retries: 7,
  });
};

export const translateSB = async (text, sourceLang, targetLang) => {
  return await pRetry(() => getTranslation(text, sourceLang, targetLang), {
    onFailedAttempt: (error) => {
      console.log(
        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
      );
    },
    retries: 7,
  });
};
