//import React, { Component } from 'react';
import React from 'react';
import {Provider} from "react-redux";
import decode from "jwt-decode";

// import api from '../services/api';
import {store} from '../store';
import {setCurrentUser, addError, setToken} from "../store/actions";

if(localStorage.jwtToken){
  setToken(localStorage.jwtToken);
  console.log(`localStorage.jwtToken:>>> ${localStorage.jwtToken}`);
  try{
    console.log(`Decoded localStorage.jwtToken:>>> ${decode(localStorage.jwtToken)}`);
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  }catch(error){
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(error));
  }
}else{
  console.log("No token found in localStorage!");
}

const App = () => (
  <Provider store={store}>
    <div>App works!</div>
  </Provider>
);

export default App;
