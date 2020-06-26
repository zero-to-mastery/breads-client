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