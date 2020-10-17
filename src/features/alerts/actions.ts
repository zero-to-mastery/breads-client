import { ADD_ALERT, REMOVE_ALERT } from "../actionTypes";
import { AlertState, AlertActionTypes } from "./types";

export const addAlert = ({message, type}: AlertState): AlertActionTypes => ({
    type: ADD_ALERT,
    payload: {
        message,
        type
    }
});

export const removeAlert = (): AlertActionTypes => ({
    type: REMOVE_ALERT,
    payload: {
        message: null,
        type: null
    }
});