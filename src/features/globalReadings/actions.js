import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { addLoader, removeLoader } from '../loader/actions';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { REMOVE_READING, TOGGLE_FAVORITE } from './actionTypes';


export const toggleFavorite = (id, user_id) => ({
    type: TOGGLE_FAVORITE,
    id,
    user_id
});

export const removeReadings = (id, user_id) => ({
    type: REMOVE_READING,
    id,
    user_id
});

export const fetchReadings = (list, id) => {
    return (dispatch, getState) => {
        if (list === 'global') {
            dispatch(addLoader(list));
            return apiCall('get', '/readings')
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                    dispatch(removeLoader(list));
                })
                .catch(err => {
                    dispatch(addError(err.message));
                });
        } else if (list === 'subscriptions') {
            dispatch(addLoader(list));
            let {currentUser} = getState();
            const id = currentUser.user.id;
            return apiCall('get', `/readings/${id}/subscriptions`)
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                    dispatch(removeLoader(list));
                })
                .catch(err => {
                    dispatch(addError(err.message));
                });
        } else if (id) {
            dispatch(addLoader(list));
            return apiCall('get', `/readings/${id}`)
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                    dispatch(removeLoader(list));
                })
                .catch(err => {
                    dispatch(addError(err.message));
                });
        }
    }
}


export const postNewReading = url => (dispatch, getState) => {
    dispatch(addLoader('newReading'));
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/users/${id}/readings`, { url })
        .then(() => dispatch(removeLoader('newReading'))) // add reading to state
        .catch(err => dispatch(addError(err.message)));
}

export const removeUserReading = (user_id, reading_id) => {
    console.log(user_id);
    console.log(reading_id);
    return dispatch => {
        return apiCall('delete', `/users/${user_id}/readings/${reading_id}`)
            .then(() => {
                // dispatch(deleteReading(user_id, reading_id)); // make one action
                dispatch(removeReadings(reading_id, user_id));
            })
            .catch(err => dispatch(addError(err.message)));
    };
};

export const markFavorite = id => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(toggleFavorite(id, user_id))) // add favorite to state
            .catch(err => dispatch(addError(err.message)));
    }
}

export const unfavorite = id => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(toggleFavorite(id, user_id))) // remove favorite from state
            .catch(err => dispatch(addError(err.message)));
    }
}

const shouldFetchReadings = (state, list) => { // same
    const readings = state.readingsByList[list];
    if (!readings) {
         return true;
    }
    // else if (loader.isLoading) {
    //      return false;
    // }
}

export const fetchReadingsIfNeeded = (list, id) => {
    return (dispatch, getState) => {
        if (shouldFetchReadings(getState(), list)) {
            return dispatch(fetchReadings(list, id));
        }
    }
}