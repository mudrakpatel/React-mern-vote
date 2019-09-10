//import React, { Component } from 'react';
import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import decode from "jwt-decode";

import {store} from '../store';
import {setToken, setCurrentUser, addError} from "../store/actions";

import NavBar from './NavBar';
import RouteViews from './RouteViews';

if(localStorage.jsonWebToken){
    setToken(localStorage.jsonWebToken);
    console.log(`localStorage.jsonWebToken:>>> ${localStorage.jsonWebToken}`);
    try{
      store.dispatch(setCurrentUser(decode(localStorage.jsonWebToken)));
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
