import { LOAD_SUMMARY, REMOVE_SUMMARY } from '../actionTypes'; //REMOVE_SUMMARY

const summary = (state= {summary: ''}, action) => {
    switch (action.type) {
        case LOAD_SUMMARY:
            return {...state, summary: action.summary};
        case REMOVE_SUMMARY:
            return {...state, summary: ''};
        default:
            return state;
    }
}

export default summary;