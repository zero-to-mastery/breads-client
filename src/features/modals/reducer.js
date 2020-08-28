import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';

export default (state = { modalType: null, modalProps: { open: false } }, action) => {
    switch (action.type) {
        case ADD_MODAL:
            return { ...state, modalType: action.modalType, modalProps: action.modalProps };
        case REMOVE_MODAL:
            return { ...state, modalType: null, modalProps: { open: false } };
        default:
            return state;
    }
};