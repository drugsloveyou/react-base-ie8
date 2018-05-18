// import "whatwg-fetch"; //不用兼容ie8时使用这个
import "fetch-ie8"; //https://www.npmjs.com/package/fetch-ie8
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  // return response.data; //axios
  return response.json(); //fetch
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// export default function request(url, options) {
//   return axios(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}