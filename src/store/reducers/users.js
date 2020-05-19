import { LOAD_USERS } from '../actionTypes';

const user = (state=[], action) => {
    switch (action.type) {
        case LOAD_USERS:
            return [...action.users];
        default:
            return state;
    }
}

export default user;