//import React, { Component } from 'react';
import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import decode from "jwt-decode";

import {store} from '../store';
import {setToken, setCurrentUser, addError} from "../store/actions";

import NavBar from './NavBar';
import RouteViews from './RouteViews';

if(localStorage.getItem("jsonWebToken")){
    //setToken(localStorage.jsonWebToken);
    const jsonWebToken = localStorage.getItem("jsonWebToken");
    console.log(`jsonWebToken:>>> ${jsonWebToken}`);
    setToken(jsonWebToken);
    try{
      store.dispatch(setCurrentUser(decode(jsonWebToken)));
    }catch(error){
      store.dispatch(setCurrentUser({}));
      store.dispatch(addError(error));
    }
}else{
  console.log("No token found in localStorage!");
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>

        <NavBar/>
        <RouteViews/>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
