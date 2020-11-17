import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';

export type ModalReading = string;

export type ModalTags = any[];

export interface ModalState { 
    reading_url: ModalReading
    tag_names: ModalTags[]
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