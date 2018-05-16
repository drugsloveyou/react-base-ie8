// import "whatwg-fetch";
// import "fetch-ie8";
// const axios = window.axios;
import axios from "axios";
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return axios(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
