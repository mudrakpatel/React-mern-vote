import axios from 'axios';

export const setToken = (jsonWebToken) => {
  if(jsonWebToken){
    //axios.defaults.headers.common["Authorization"] = `Bearer ${jsonWebToken}`;
    //axios.defaults.headers.common["Authorization"] = `${jsonWebToken}`;
    axios.defaults.headers.common["Authorization"] = jsonWebToken;
    console.log(`Token log from api.js:>>> ${jsonWebToken}`);
  } else {
    console.log("No token found from api.js - client/services");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`/${path}`, data);
  console.log("Logging api.call response...");
  console.log(response);
  console.log("Logging finished - api.call response.");
  return response;
};

export default {call, setToken};
