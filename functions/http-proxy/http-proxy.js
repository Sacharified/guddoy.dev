/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  const path = event.path.replace(`/.netlify/functions/http-proxy/`, ``);
  const headers = { ...event.headers, Accept: "application/json" };
  delete headers.host;
  try {
    const response = await fetch(path, {
      headers
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ...data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
