import { ADD_ERROR, REMOVE_ERROR, ADD_SUCCESS, REMOVE_ALERT } from "../actionTypes";

export const addError = error => ({
    type: ADD_ERROR,
    error
});

export const removeError = () => ({
    type: REMOVE_ERROR
});

export const addSuccess = success => ({
    type: ADD_SUCCESS,
    success
});

export const removeAlert = () => ({
    type: REMOVE_ALERT
});