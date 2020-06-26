import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { addLoader, removeLoader } from '../loader/actions';
import { receiveEntities, deleteReading } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { REMOVE_READING, ADD_FAVORITE, REMOVE_FAVORITE } from './actionTypes';


export const addFavorite = id => ({
    type: ADD_FAVORITE,
    id
});

export const removeFavorite = id => ({
    type: REMOVE_FAVORITE,
    id
});

export const removeReadings = id => ({
    type: REMOVE_READING,
    id
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
                dispatch(deleteReading(user_id, reading_id)); // make one action
                dispatch(removeReadings(reading_id));
            })
            .catch(err => dispatch(addError(err.message)));
    };
};

export const markFavorite = id => {
    return (dispatch, getState) => {
        console.log(id);
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/readings/${id}/favorite/${user_id}`)
            .then(res => dispatch(addFavorite(id))) // add favorite to state
            .catch(err => dispatch(addError(err.message)));
    }
}

export const unfavorite = id => {
    return (dispatch, getState) => {
        console.log(id);
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
            .then(res => dispatch(removeFavorite(id))) // add favorite to state
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