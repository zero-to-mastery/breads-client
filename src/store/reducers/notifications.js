import { LOAD_NOTIFICATIONS } from '../actionTypes';

const notification = (state=[], action) => {
    switch (action.type) {
        case LOAD_NOTIFICATIONS:
            return [...action.notifications];
        default:
            return state;
    }
}

export default notification;