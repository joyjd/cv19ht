import GoogleCredentials from "./../GoogleCredentials";

const apiKey = "&key=" + GoogleCredentials.apiKey;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const CommunicatorFetch = (urlName, params, proxyNeed) => {
  console.log("Communication fetched==" + urlName);
  let url;
  if (params !== undefined) {
    if (proxyNeed !== undefined) {
      url = proxyurl + urlName + params + apiKey;
    } else {
      url = urlName + params + apiKey;
    }
  } else {
    url = urlName;
  }
  //url =  url;
  return fetch(url, { cache: "no-store" }).then((response) => response.json());
};
