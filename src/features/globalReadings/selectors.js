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

export const getWebsites = (state, list) => {
    // get readings by list (wait for list to load)
    if (state.readingsByList[`${list}`]) {
        // map readings into array of domain names
        const readings = state.readingsByList[`${list}`].map(id => state[NAME][id]);
        
        // count frequencies into object
        let websiteCount = {};
        for(let reading of readings){
            websiteCount[reading.domain] = (websiteCount[reading.domain] || 0) + 1;
        }

        // return object of websites with # of articles read
        return websiteCount;
    }
}