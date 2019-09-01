import {addError, removeError} from "./error";
import {SET_CURRENT_USER} from "../actionTypes";
import api from "../../services/api";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

export const setToken = (token) => {
  if(token){
    api.setToken();
  } else{
    console.log("No token found");
  }
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    api.setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  }
}

export const authUser = (path, data) => {
  //if(path && data){
    return async dispatch => {
      try {
        const {token, ...user} = await api.call("post", `auth/${path}`, data);
        //if(token && user){
          localStorage.setItem("jwtToken", token);
          console.log(`Token:>>> ${token}`);
          api.setToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
        // }else{
        //   console.log("Either token or user, one or both are missing!");
        // }
      } catch(err) {
        const error = err.response.data;
        dispatch(addError(error));
      }
    }
  // }else{
  //   console.log("Either path or data, one or both are missing!");
  // }
};
