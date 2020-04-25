import { LOAD_SUMMARY, REMOVE_SUMMARY } from '../actionTypes';

export default (state= {summary: ''}, action) => {
    switch (action.type) {
        case LOAD_SUMMARY:
            return {...state, summary: action.summary};
        case REMOVE_SUMMARY:
            return {...state, summary: ''};
        default:
            return state;
    }
}