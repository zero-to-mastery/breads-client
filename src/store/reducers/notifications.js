import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../actionTypes';

const notification = (state=[], action) => {
    switch (action.type) {
        case LOAD_NOTIFICATIONS:
            return [...action.notifications];
        case REMOVE_NOTIFICATIONS:
            return state.filter(notification => notification.subscriber_id !== action.id);
        default:
            return state;
    }
}

export default notification;