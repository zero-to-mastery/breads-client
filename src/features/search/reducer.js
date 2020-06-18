import { LOAD_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS } from './actionTypes';

const results = (state={users: [], readings: []}, action) => {
    switch (action.type) {
        case LOAD_SEARCH_RESULTS:
            return {...action.results};
        case REMOVE_SEARCH_RESULTS:
            return [];
        default:
            return state;
    }
}

export default results;