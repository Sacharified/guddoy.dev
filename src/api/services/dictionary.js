import axios from "axios";
import { OXFORD_DICTIONARY_APP_KEY as app_key, OXFORD_DICTIONARY_APP_ID as app_id } from "utils/env";
import { withProxy } from "api/base";

const requestConfig = {
    headers: { app_id, app_key },
    withCredentials: false
};

const baseUrl = withProxy("https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/");
const dictCache = {};

export const getDefinition = async (word = "") => {
    if (!dictCache.hasOwnProperty(word)) {
        try {
            dictCache[word] = axios.get(baseUrl + word, requestConfig);
        } catch(e) {
            dictCache[word] = Promise.reject({ data: { error: true, id: word } });
        }
    }
    const { data } = await dictCache[word];
    return data;
}