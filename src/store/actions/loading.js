import { ADD_LOADER, REMOVE_LOADER } from "../actionTypes";

export const addLoader = id => ({
    type: ADD_LOADER,
    id
});

export const removeLoader = () => ({
    type: REMOVE_LOADER
});