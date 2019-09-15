import API from "../../services/api";
import {SET_POLLS, SET_CURRENT_POLL} from "../actionTypes";
import {addError, removeError} from "./error";

export const setPolls = (polls) => ({
  type: SET_POLLS,
  polls
});

export const setCurrentPoll = (poll) => ({
  type: SET_CURRENT_POLL,
  poll
});

export const getPolls = () => {
  return async dispatch => {
    try{
      const polls = await API.call("get", "poll");
      console.log("Logging polls...");
      console.log(polls);
      console.log("Finished logging polls.");
      dispatch(setPolls(polls.data));
      dispatch(removeError());
    }catch(err){
      //console.log(err.message);
      //const error = err.response.data;
      const error = err.message;
      dispatch(addError(error));
      //dispatch(addError(error.message));
    }
  }
};

export const getUserPolls = () => {
  return async dispatch => {
    console.log("Executing getUserPolls...");
    try{
      // const polls = await API.call("get", "poll/user");
      // console.log("Logging user polls...");
      // console.log(polls);
      // console.log("Finished logging user polls.");
      // dispatch(setPolls(polls));
      // dispatch(removeError());
      const user = await API.call("get", "poll/user");
      console.log("Logging user - getUserPolls...");
      console.log(user);
      console.log("Finished logging user - getUserPolls");
    }catch(err){
      const error = err.response.data;
      dispatch(addError(error));
      //dispatch(addError(error.message));
    }
  }
};

export const createPoll = (data) => {
  return async dispatch => {
    try{
      const poll = await API.call("post", "poll", data);
      console.log("Logging created poll...");
      console.log(poll);
      console.log("Finished logging created poll.");
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    }catch(err){
      const error = err.response.data;
      dispatch(addError(error));
      //dispatch(addError(error.message));
    }
  }
};

export const getCurrentPoll = (id) => {
  return async dispatch => {
    try{
      const poll = await API.call("get", `poll/${id}`);
      console.log("Logging retrieved poll...");
      console.log(poll);
      console.log("Finished logging retrieved poll.");
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    }catch(err){
      const error = err.response.data;
      dispatch(addError(error));
      //dispatch(addError(error.message));
    }
  }
};

export const vote = (id, data) => {
  return async dispatch => {
    try{
      const poll = await API.call("post", `poll/${id}`, data);
      console.log("Logging voted poll...");
      console.log(poll);
      console.log("Finished logging voted poll.");
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    }catch(err){
      const error = err.response.data;
      dispatch(addError(error));
      //dispatch(addError(error.message));
    }
  }
};
