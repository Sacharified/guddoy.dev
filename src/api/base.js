export const HTTP_PROXY_PATH = "/.netlify/functions/http-proxy/";
export const withProxy = url => `${HTTP_PROXY_PATH}${url}`;