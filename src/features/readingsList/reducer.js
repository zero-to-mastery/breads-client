import { combineReducers } from 'redux';
import { RECEIVE_ENTITIES, SELECT_LIST } from "../actions";

const getIds = (readings) => {
    return Object.values(readings).map(reading => reading.id);
}

const selectedList = (state = '', action) => {
    switch (action.type) {
        case SELECT_LIST:
            return action.list
        default:
            return state
    }
}

const readingsByList = (state = {}, action) => {
    switch (action.type) {
        // case INVALIDATE_LIST:
        //     return { didInvalidate: true }
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, [action.list]: getIds(entities.readings) };
            }
        // case DELETE:
        //     return { didInvalidate: false, state.data.filter(reading => reading.id !== action.id) };
        default:
            return state
   }
}


export default readingsByList;