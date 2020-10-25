import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';

export type ModalType = string | null;

export type ModalProps = {
    [k: string]: any
    open?: boolean
}

export interface ModalState { 
    modalType: ModalType
    modalProps: ModalProps
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