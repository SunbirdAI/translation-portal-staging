const API_URL = process.env.REACT_APP_API_URL;


export const getTranslation = async (sentence) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "model": "mul-en",
            "inputs": sentence
        })
    }
    const response = await (await fetch(API_URL, requestOptions)).json();
    return response[0]["generated_text"];
}
