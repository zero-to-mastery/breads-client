import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { LOAD_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS } from './actionTypes';
import { addLoader, removeLoader } from '../loader/actions';

export const loadSearchResults = results => ({
    type: LOAD_SEARCH_RESULTS,
    results
});

export const removeSearchResults = () => ({
    type: REMOVE_SEARCH_RESULTS
})

export const searchAll = () => {
    return dispatch => {
        dispatch(addLoader('search'));
        return apiCall('get', `/search`)
            .then(res => {
                dispatch(loadSearchResults(res));
                dispatch(removeLoader('search'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const searchUsers = search => {
    return dispatch => {
        dispatch(addLoader('search'));
        return apiCall('get', `/search/users?users=${search}`)
            .then(res => {
                dispatch(loadSearchResults(res));
                dispatch(removeLoader('search'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}