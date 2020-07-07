import { NAME } from './constants';

export const getReadings = (state, list, fav) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        let readings = state.readingsByList[`${list}`].map(id => state[NAME][id]).reverse();
        if (fav) return readings.filter(reading => reading.favorite === reading.reader);
        return readings;
    }
}

export const getReadingById = (state, list, id) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        return state.readings[id];
    }
}