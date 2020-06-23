import { REMOVE_USER_READING } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';
import { NAME } from './constants';

export const getReadings = (state, list, fav) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        let userReadings = state.readingsByList[`${list}`].map(id => state[NAME][id]).reverse();
        if (fav) return userReadings.filter(reading => reading.favorite === reading.reader);
        return userReadings;
    }
}

export const getReadingById = (state, list, id) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        return state.readings[id];
    }
}

const reading = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
        // case LOAD_READING:
        // case REMOVE_USER_READING:
        //     return {
        //         data: state.data.filter(reading => reading.id !== action.id),
        //         websites: state.websites
        //     };
        default:
            return state;
    }
}

export default reading;