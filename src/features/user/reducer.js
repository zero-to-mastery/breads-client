import { RECEIVE_ENTITIES } from '../actionTypes';

const user = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.users) {
                return { ...state, ...entities.users }
            } 
            /* falls through */
        default:
            return state;
    }
}

export default user;