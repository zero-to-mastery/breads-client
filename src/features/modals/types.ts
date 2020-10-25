import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';

export interface ModalState { 
    modalType: string | null,
    modalProps: { 
        open: boolean
    }
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