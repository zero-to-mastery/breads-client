import { RECEIVE_ENTITIES } from '../actions';
import { REMOVE_READING } from '../globalReadings/actionTypes';
import { REMOVE_SUBSCRIPTIONS } from '../subscriptions/actionTypes';



const getIds = (readings) => {
    return Object.values(readings).map(reading => reading.id);
}

const readingsByList = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, [action.list]: getIds(entities.readings) };
            }
        case REMOVE_READING:
            const { id, user_id } = action;
            if (id && user_id) {
                return {
                    ...state,
                    [user_id]: state[user_id].filter(sub => sub !== id)
                }
            }
        default:
            return state
   }
}


export default readingsByList;