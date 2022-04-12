const API_URL = process.env.REACT_APP_API_URL;
const FEEDBACK_URL = process.env.REACT_APP_FEEDBACK_URL;
export const tracking_id = process.env.REACT_APP_GA4_TRACKING_ID;


export const getTranslation = async (sentence, model) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "model": model,
            "inputs": sentence
        })
    }
    const response = await (await fetch(API_URL, requestOptions)).json();
    return response[0]["generated_text"];
}

export const sendFeedback = async (feedback, sourceText, translation, from, to) => {
    const time = Date.now();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Timestamp: time,
            feedback: feedback,
            SourceText: sourceText,
            LanguageFrom: from,
            LanguageTo: to,
            TranslatedText: translation
        })
    }
    const response = await (await fetch(FEEDBACK_URL, requestOptions)).json();
    return response;
}
