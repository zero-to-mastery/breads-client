import { ADD_ALERT , REMOVE_ALERT } from "../actionTypes";

export interface AlertState {
    message: string | null,
    type: 'danger' | 'success' | null
}

interface AddAlertAction {
    type: typeof ADD_ALERT
    payload: AlertState
}

interface RemoveAlertAction {
    type: typeof REMOVE_ALERT
    payload: AlertState
}

export type AlertActionTypes = AddAlertAction | RemoveAlertAction;