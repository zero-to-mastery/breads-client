import { NAME } from './constants';

export const getReadings = (state, list, fav, outdated) => {
    // give time for readingsByList items to load
    if (state.readingsByList[`${list}`] && state.readingsByList[`${list}`].items) {
        let readings = state.readingsByList[`${list}`].items.map(id => state[NAME][id]).reverse();
        if (fav) return readings.filter(reading => reading.favorite === reading.reader);
        if (outdated) return getUserReadingsInNeedOfUpdate(state, list);
        return readings;
    }
}

export const getReadingById = (state, list, id) => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        return state[NAME][id];
    }
}

export const getWebsites = (state, list) => {
    // get readings by list (wait for list to load)
    if (state.readingsByList[`${list}`] && state.readingsByList[`${list}`].items) {
        // map readings into array of domain names
        const readings = state.readingsByList[`${list}`].items.map(id => state[NAME][id]);
        
        // count frequencies into object
        let websiteCount = {};
        for(let reading of readings){
            websiteCount[reading.domain] = (websiteCount[reading.domain] || 0) + 1;
        }

        // return object of websites with # of articles read
        return websiteCount;
    }
}

export const getUserReadingsInNeedOfUpdate = (state, list) => {
    // get readings by list (wait for list to load)
    if (state.readingsByList[`${list}`] && state.readingsByList[`${list}`].items) {
        const readings = state.readingsByList[`${list}`].items.map(id => state['readings'][id]).reverse(); // NAME from readings constants
        const updateConditions = ['403 ', 'Are you a robot', 'Bloomberg', 'Unable to get title of article', 'Error 404'];
        
        // if title in conditions list, return reading
        const titleCheck = reading => updateConditions.some(r => reading.title.includes(r));
        
        // if description and image are blank, return reading
        const descriptionAndImageCheck = reading => reading.description === null && reading.reading_image === null;

        const outdatedReadingsFromTitle = readings.filter(reading => titleCheck(reading));
        const outdatedReadingsFromOther = readings.filter(reading => descriptionAndImageCheck(reading));
        
        // prevent duplicates using set
        return [...new Set([...outdatedReadingsFromTitle, ...outdatedReadingsFromOther])];
    }
}