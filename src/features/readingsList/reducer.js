import { RECEIVE_ENTITIES } from '../actions';
import { ADD_READING, REMOVE_READING } from '../globalReadings/actionTypes';
import { REMOVE_SUBSCRIPTIONS, ADD_SUBSCRIPTION } from '../subscriptions/actionTypes';

const getIds = readings => {
    return Object.values(readings).map(reading => reading.id);
}

const readingsByList = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return {
                    ...state,
                    [action.list]: {
                        upToDate: true, 
                        items: getIds(entities.readings)
                    }
                }
            }
        case ADD_READING:
            if (action.user_id && state[action.user_id]) {
                return {
                    ...state,
                    global: {
                        ...state.global,
                        upToDate: false
                    },
                    [action.user_id]: {
                        ...state[action.user_id],
                        upToDate: false
                    }
                }
            } else if (action.user_id && !state[action.user_id]){
                return {
                    ...state,
                    global: {
                        ...state.global,
                        upToDate: false
                    }
                }
            }
        case REMOVE_READING:
            const { reading_id, user_id } = action;
            if (reading_id && user_id) {
                return {
                    ...state,
                    [user_id]: {
                        upToDate: true,
                        items: state[user_id].filter(sub => sub !== reading_id)
                    }
                }
            }
        case ADD_SUBSCRIPTION:
            if (state.subscriptions) return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    upToDate: false
                }
            }
        case REMOVE_SUBSCRIPTIONS:
            if (state.subscriptions && 
                action.id && action.user_id) {
                const filteredSubReadings = state.subscriptions.items
                                                .map(id => action.readings[id])
                                                .filter(reading => reading.reader !== action.id)
                                                .map(reading => reading.id);
                return {
                    ...state,
                    subscriptions: {
                        upToDate: true,
                        items: [...filteredSubReadings]
                    }
                }
            }
        default:
            return state
   }
}


export default readingsByList;