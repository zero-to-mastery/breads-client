import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadSearchResults = results => ({
    type: LOAD_SEARCH_RESULTS,
    results
});

export const removeSearchResults = () => ({
    type: REMOVE_SEARCH_RESULTS
})

export const searchAll = () => {
    return dispatch => {
        dispatch(addLoader());
        return apiCall('get', `/search`)
            .then(res => {
                dispatch(loadSearchResults(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const searchUsers = search => {
    return dispatch => {
        dispatch(addLoader());
        return apiCall('get', `/search/users?users=${search}`)
            .then(res => {
                dispatch(loadSearchResults(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}