import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../actionTypes';

export interface NotificationsState { 
    notifications: any[]
}

interface LoadNotificationsAction {
    type: typeof LOAD_NOTIFICATIONS
    payload: NotificationsState
}

interface RemoveNotificationsAction {
    type: typeof REMOVE_NOTIFICATIONS
    id: any
}

export type ModalActionTypes = LoadNotificationsAction | RemoveNotificationsAction;