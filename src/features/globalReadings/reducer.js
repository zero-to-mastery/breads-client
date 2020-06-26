import { REMOVE_READING } from './actionTypes';
import { RECEIVE_ENTITIES } from '../actions';

// export const getReadings = (state, list, fav) => {
//     if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
//         let userReadings = state.readingsByList[`${list}`].map(id => state[NAME][id]).reverse();
//         if (fav) return userReadings.filter(reading => reading.favorite === reading.reader);
//         return userReadings;
//     }
// }

// export const getReadingById = (state, list, id) => {
//     if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
//         return state.readings[id];
//     }
// }

const reading = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
        case REMOVE_READING:
            const key = action.id;
            const { [key]: value, ...other } = state;
            return other;
            // return Object.keys(state).filter(id => id !== action.id);
        default:
            return state;
    }
}

export default reading;