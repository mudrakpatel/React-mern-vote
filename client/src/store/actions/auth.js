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
        console.log(data);
        const {...user} = await api.call("post", `auth/${path}`, data);
        //if(token && user){
          //window.localStorage.setItem("jsonWebToken", token);

          localStorage.setItem("jsonWebToken", user.data.token);
          //console.log(`Token:>>> ${user.data.token}`);
          api.setToken(user.data.token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());

          // console.log("Logging jsonWebToken...");
          // console.log(user.data.token);
          // console.log(user);
          // console.log("Logging finished - jsonWebToken.");

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
