import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';

export type ModalType = string | null;

export type ModalProperties = {
    [k: string]: any
    open?: boolean
}

export interface ModalState { 
    modalType: ModalType
    modalProps: ModalProperties
}

interface AddModalAction {
    type: typeof ADD_MODAL
    payload: ModalState
}

interface RemoveModalAction {
    type: typeof REMOVE_MODAL
    payload: ModalState
}

export type ModalActionTypes = AddModalAction | RemoveModalAction;