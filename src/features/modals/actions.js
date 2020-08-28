import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';

export const addModal = (modalType, modalProps) => ({
    type: ADD_MODAL,
    modalType,
    modalProps
});

export const removeModal = () => ({
    type: REMOVE_MODAL
});