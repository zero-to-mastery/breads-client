import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import loader from '../loader';
import tags from '../tags';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { ADD_READING, REMOVE_READING, TOGGLE_FAVORITE } from '../actionTypes';

const { addAlert } = alerts.actions;
const { addLoader, removeLoader } = loader.actions;
const { addTag } = tags.actions;

export const toggleFavorite = (id, user_id) => ({
    type: TOGGLE_FAVORITE,
    id,
    user_id
});

export const addReading = user_id => ({
    type: ADD_READING,
    user_id
});

export const removeReadings = (reading_id, user_id) => ({
    type: REMOVE_READING,
    reading_id,
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
                    dispatch(addAlert({message: err.message, type: 'danger'}));
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
                    dispatch(addAlert({message: err.message, type: 'danger'}));
                });
        } else if (id) {
            dispatch(addLoader(list));
            return apiCall('get', `/readings/${id}`)
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.reading]), list));
                    dispatch(removeLoader(list));
                })
                .catch(err => {
                    dispatch(addAlert({message: err.message, type: 'danger'}));
                });
        }
    }
}


export const postNewReading = (url, tags) => (dispatch, getState) => {
    dispatch(addLoader('newReading'));
    let { currentUser } = getState();
    const id = currentUser.user.id;
    console.log(tags);
    return apiCall('post', `/users/${id}/readings`, { url, tags })
        .then(() => {
            dispatch(addReading(id));
            dispatch(addTag(id));
            dispatch(removeLoader('newReading'));
            dispatch(addAlert({message: 'Article uploaded', type: 'success'}));
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const removeUserReading = (user_id, reading_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${user_id}/readings/${reading_id}`)
            .then(() => {
                dispatch(removeReadings(reading_id, user_id));
                dispatch(addAlert({message: 'Reading removed', type: 'success'}));
            })
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    };
};

export const markFavorite = id => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(toggleFavorite(id, user_id))) // add favorite to state
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    }
}

export const unfavorite = id => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(toggleFavorite(id, user_id))) // remove favorite from state
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    }
}

const shouldFetchReadings = (state, list) => {
    const readings = state.readingsByList[list];
    if (!readings) return true;
    
    // only initiates if there's readings
    const upToDate = state.readingsByList[list].upToDate;
    if (upToDate === false) return true;
}

export const fetchReadingsIfNeeded = (list, id) => {
    return (dispatch, getState) => {
        if (shouldFetchReadings(getState(), list)) {
            return dispatch(fetchReadings(list, id));
        }
    }
}

export const updateReading = (url, reading_id, user_id) => dispatch => {
    dispatch(addLoader('updateReading'));
    return apiCall('put', `/readings/${reading_id}`, { url, user_id })
        .then(res => {
            setTimeout(() => {
                dispatch(removeLoader('updateReading'));
                dispatch(addAlert({message: 'Updated reading successfully.', type: 'success'}));
            }, 11000);
            console.log(res.affectedRows);
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}