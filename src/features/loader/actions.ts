import { ADD_LOADER, REMOVE_LOADER } from "../actionTypes";
import { LoaderActionTypes } from "./types";

export const addLoader = (id: any): LoaderActionTypes => ({
    type: ADD_LOADER,
    id
});

export const removeLoader = (id: any): LoaderActionTypes => ({
    type: REMOVE_LOADER,
    id
});