import axios from "axios";
import { OXFORD_DICTIONARY_APP_KEY as app_key, OXFORD_DICTIONARY_APP_ID as app_id } from "utils/env";

const requestConfig = {
    headers: { app_id, app_key },
    withCredentials: false
};

const baseUrl = "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/";
const dictCache = {};

export const getDefinition = async (word = "") => {
    if (dictCache.hasOwnProperty(word)) {
        return dictCache[word];
    }

    try {
        dictCache[word] = axios.get(baseUrl + word, requestConfig);
        const { data } = await dictCache[word];
        dictCache[word] = Promise.resolve(data);
        return data;
    } catch(e) {
        dictCache[word] = Promise.reject({ error: true });
        return dictCache[word];
    }
}