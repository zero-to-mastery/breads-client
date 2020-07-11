import { RECEIVE_ENTITIES, REMOVE_READING, TOGGLE_FAVORITE } from '../actionTypes';

const reading = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
        case TOGGLE_FAVORITE: 
            const { id, user_id } = action;
            if (id && user_id) {
                const reading = state[id];
                return {
                    ...state,
                    [id]: {
                        ...reading,
                        favorite: reading.favorite === null ? user_id : null
                    }
                }
            }
        case REMOVE_READING:
            const key = action.reading_id;
            const { [key]: value, ...other } = state;
            return other;
        default:
            return state;
    }
}

export default reading;