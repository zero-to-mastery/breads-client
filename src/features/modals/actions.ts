import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';
import { ModalActionTypes, ModalProps, ModalType } from './types';

export const addModal = (modalType: ModalType, modalProps: ModalProps): ModalActionTypes => ({
    type: ADD_MODAL,
    payload: {
        modalType,
        modalProps
    }
});

export const removeModal = (): ModalActionTypes => ({
    type: REMOVE_MODAL,
    payload: { 
        modalType: null,
        modalProps: {
            open: false
        }
    }
});