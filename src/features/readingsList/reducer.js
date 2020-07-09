import { RECEIVE_ENTITIES } from '../actions';
import { REMOVE_READING } from '../globalReadings/actionTypes';
import { REMOVE_SUBSCRIPTIONS, ADD_SUBSCRIPTION } from '../subscriptions/actionTypes';

const getIds = readings => {
    return Object.values(readings).map(reading => reading.id);
}

const readingsByList = (state = { upToDate: false }, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, upToDate: true, [action.list]: getIds(entities.readings) };
            }
        case REMOVE_READING:
            const { reading_id, user_id } = action;
            if (reading_id && user_id) {
                return {
                    ...state,
                    upToDate: true,
                    [user_id]: state[user_id].filter(sub => sub !== reading_id)
                }
            }
        case ADD_SUBSCRIPTION:
            if (state.subscriptions) return { ...state, upToDate: false }
        case REMOVE_SUBSCRIPTIONS:
            if (state.subscriptions && 
                action.id && action.user_id) {
                const filteredSubReadings = state.subscriptions
                                                .map(id => action.readings[id])
                                                .filter(reading => reading.reader !== action.id)
                                                .map(reading => reading.id);
                return {
                    ...state,
                    upToDate: true,
                    subscriptions: [...filteredSubReadings]
                }
            }
        default:
            return state
   }
}


export default readingsByList;