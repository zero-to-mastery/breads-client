// import { RootState } from '../rootReducer';
import { NAME } from './constants';

const getFavoriteReadings = (readings: any[]): any[] => {
    return readings.filter(reading => reading.favorite === reading.reader);
}

const getTagReadings = (readings: any[], tag_id: number): any[] => {
    return readings.filter(reading => {
        const notNull = reading.tags !== null;
        const containsTagId = reading.tags === tag_id || (notNull && reading.tags.includes(tag_id));

        return containsTagId;
    });
}

/**
 * @todo update prop types once readingsByList state is type checked
 */
export const getReadings = (state: any, list: string, fav: any, outdated: any, tag_id: number): any[] | void => {
    // give time for readingsByList items to load
    if (state.readingsByList[`${list}`] && state.readingsByList[`${list}`].items) {
        let readings = state.readingsByList[`${list}`].items.map((id: number) => state[NAME][id]).reverse();
        if (fav) return getFavoriteReadings(readings);
        if (outdated) return getUserReadingsInNeedOfUpdate(state, list);
        if (tag_id) return getTagReadings(readings, tag_id);
        return readings;
    }
}

/**
 * @todo update prop types once readingsByList state is type checked
 */
export const getReadingById = (state: any, list: string, id: number): any => {
    if (state.readingsByList[`${list}`]) { // give time for readingsByList to load
        return state[NAME][id];
    }
}

/**
 * @todo update prop types once readingsByList state is type checked
 */
export const getWebsites = (state: any, list: string, tag_id: number): {[k: string]: any} => {
    let websiteCount: {[k: string]: any} = {};
    
    // get readings by list (wait for list to load)
    if (state.readingsByList[`${list}`] && state.readingsByList[`${list}`].items) {
        // map readings into array of domain names
        let readings = state.readingsByList[`${list}`].items.map((id: number) => state[NAME][id]);
        
        // only use tag readings if tag_id is included
        if (tag_id) readings = getTagReadings(readings, tag_id);
        
        // count frequencies into object
        for(let reading of readings){
            websiteCount[reading.domain] = (websiteCount[reading.domain] || 0) + 1;
        }        
    }
    return websiteCount;
}

/**
 * @todo update prop types once readingsByList state is type checked
 */
export const getUserReadingsInNeedOfUpdate = (state: any, list: string): any[] | void => {
    // get readings by list (wait for list to load)
    if (state.readingsByList[`${list}`] && state.readingsByList[`${list}`].items) {
        const readings = state.readingsByList[`${list}`].items.map((id: number) => state['readings'][id]).reverse(); // NAME from readings constants
        const updateConditions = ['403 ', 'Are you a robot', 'Bloomberg', 'Unable to get title of article', 'Error 404'];
        
        // if title in conditions list, return reading
        const titleCheck = (reading: any) => updateConditions.some(r => reading.title.includes(r));
        
        // if description and image are blank, return reading
        const descriptionAndImageCheck = (reading: any) => reading.description === null && reading.reading_image === null;

        const outdatedReadingsFromTitle = readings.filter((reading: any) => titleCheck(reading));
        const outdatedReadingsFromOther = readings.filter((reading: any) => descriptionAndImageCheck(reading));
        
        // prevent duplicates using set
        // return [...new Set([...outdatedReadingsFromTitle, ...outdatedReadingsFromOther])];
        return [...outdatedReadingsFromTitle, ...outdatedReadingsFromOther];
    }
}