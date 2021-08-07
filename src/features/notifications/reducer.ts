import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from "../actionTypes";
import { NotificationActionTypes, NotificationState } from "./types";

const notification = (
  state: NotificationState = [],
  action: NotificationActionTypes
) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return [...action.payload.notifications];
    case REMOVE_NOTIFICATIONS:
      return state.filter(
        (notification) => notification.subscriber_id !== action.id
      );
    default:
      return state;
  }
};

export default notification;
