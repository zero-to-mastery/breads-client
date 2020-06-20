import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { LOAD_USER_READINGS, REMOVE_USER_READING, ADD_FAVORITE, REMOVE_FAVORITE } from './actionTypes';
import { addLoader, removeLoader } from '../loader/actions';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';

export const loadUserReadings = readings => ({
    type: LOAD_USER_READINGS,
    readings
});

export const removeUserReadings = id => ({
    type: REMOVE_USER_READING,
    id
});

export const addFavorite = id => ({
    type: ADD_FAVORITE,
    id
});

export const removeFavorite = id => ({
    type: REMOVE_FAVORITE,
    id
});

export const removeUserReading = (user_id, reading_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${user_id}/readings/${reading_id}`)
            .then(() => dispatch(removeUserReadings(reading_id)))
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};

export const fetchUserReadings = (list, userId) => {
    return dispatch => {
        dispatch(addLoader('userReadings'));
        return apiCall('get', `/readings/${userId}`)
            .then(res => {
                dispatch(receiveEntities(list, normalize(res, [schema.reading])));
                // dispatch(loadUserReadings(res));
                dispatch(removeLoader('userReadings'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}

// add new favorite
export const markFavorite = id => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(addFavorite(id)))
            .catch(err => dispatch(addError(err.message)));
    }
}

// remove from favorites
export const unfavorite = id => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(removeFavorite(id)))
            .catch(err => dispatch(addError(err.message)));
    }
}

const shouldFetchUserReadings = (state, list) => {
    const readings = state.readingsByList[list];
    if (!readings) {
         return true;
    }
    // else if (loader.isLoading) {
    //      return false;
    // }
}

export const fetchUserReadingsIfNeeded = (list, id) => {
    return (dispatch, getState) => {
        if (shouldFetchUserReadings(getState(), list)) {
            return dispatch(fetchUserReadings(list, id));
        }
    }
}