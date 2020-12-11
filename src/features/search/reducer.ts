import { LOAD_SEARCH_RESULTS } from '../actionTypes';
import { SearchActionTypes, SearchState } from './types';

const results = (state: SearchState = {users: [], readings: []}, action: SearchActionTypes) => {
    switch (action.type) {
        case LOAD_SEARCH_RESULTS:
            return {...action.payload};
        default:
            return state;
    }
}

export default results;