import { LOAD_USER } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';

export const getUserById = (state, id) => {
    // if (state.readingsByList['user']) { // give time for readingsByList to add user object
        return state.user[id];
    // }
}

const user = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.users) {
                return { ...state, ...entities.users }
            }
        // case LOAD_USER:
        //     return action.user[0];
        default:
            return state;
    }
}

export default user;