import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { LOAD_READINGS, REMOVE_READING } from './actionTypes';
import { addLoader, removeLoader } from '../loader/actions';

export const loadReadings = readings => ({
    type: LOAD_READINGS,
    readings
});

export const removeReadings = id => ({
    type: REMOVE_READING,
    id
});

export const fetchReadings = () => {
    return dispatch => {
        dispatch(addLoader('readings'));
        return apiCall('get', '/readings')
            .then(res => {
                dispatch(loadReadings(res));
                dispatch(removeLoader('readings'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const postNewReading = url => (dispatch, getState) => {
    dispatch(addLoader('newReading'));
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/users/${id}/readings`, { url })
        .then(() => dispatch(removeLoader('newReading')))
        .catch(err => dispatch(addError(err.message)));
}

export const markFavorite = id => {
    return (dispatch, getState) => {
        console.log(id);
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/readings/${id}/favorite/${user_id}`)
            .then(res => {})
            .catch(err => dispatch(addError(err.message)));
    }
}

export const unfavorite = id => {
    return (dispatch, getState) => {
        console.log(id);
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
            .then(res => {})
            .catch(err => dispatch(addError(err.message)));
    }
}