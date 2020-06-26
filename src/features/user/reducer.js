import { RECEIVE_ENTITIES } from '../actions';

const user = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.users) {
                return { ...state, ...entities.users }
            } 
        default:
            return state;
    }
}

export default user;