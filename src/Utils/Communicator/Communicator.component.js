import React from "react";
import GoogleCredentials from "./../GoogleCredentials";

const apiKey = "&key=" + GoogleCredentials.apiKey;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const CommunicatorFetch = (urlName, params) => {
  console.log("Communication fetched==" + urlName);
  let url;
  if (params !== undefined) {
    url = /* proxyurl +  */ urlName + params + apiKey;
  } else {
    url = urlName;
  }
  //url =  url;
  return fetch(url).then((response) => response.json());
};
