import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../actionTypes';
import { AlertActionTypes } from '../alerts/types';

export type NotificationType = any;

export type NotificationState = any[];

interface LoadNotificationAction {
    type: typeof LOAD_NOTIFICATIONS
    payload: NotificationType
}

interface RemoveNotificationAction {
    type: typeof REMOVE_NOTIFICATIONS
    id: any
}

export type NotificationActionTypes = LoadNotificationAction | RemoveNotificationAction;

export type PromiseReturnTypes = NotificationActionTypes | AlertActionTypes | void;