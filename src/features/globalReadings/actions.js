import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { addLoader, removeLoader } from '../loader/actions';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../userReadings/actionTypes';


export const addFavorite = id => ({
    type: ADD_FAVORITE,
    id
});

export const removeFavorite = id => ({
    type: REMOVE_FAVORITE,
    id
});

export const fetchReadings = list => {
    return (dispatch, getState) => {
        dispatch(addLoader(list));
        switch (list) {
            case 'global':
                return apiCall('get', '/readings')
                    .then(res => {
                        dispatch(receiveEntities(list, normalize(res, [schema.reading])));
                        dispatch(removeLoader(list));
                    })
                    .catch(err => {
                        dispatch(addError(err.message));
                    });
            case 'subscriptions':
                let {currentUser} = getState();
                const id = currentUser.user.id;
                return apiCall('get', `/readings/${id}/subscriptions`)
                    .then(res => {
                        dispatch(receiveEntities(list, normalize(res, [schema.reading])));
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

export const fetchReadingsIfNeeded = (list) => {
    return (dispatch, getState) => {
        if (shouldFetchReadings(getState(), list)) {
            return dispatch(fetchReadings(list));
        }
    }
}