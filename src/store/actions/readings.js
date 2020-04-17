import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_READINGS, REMOVE_READING } from '../actionTypes';

export const loadReadings = readings => ({
    type: LOAD_READINGS,
    readings
});

export const removeReadings = id => ({
    type: REMOVE_READING,
    id
});

export const removeReading = (user_id, reading_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${user_id}/readings/${reading_id}`)
            .then(() => dispatch(removeReadings(reading_id)))
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};

export const fetchReadings = () => {
    return dispatch => { //getState
        return apiCall('get', '/readings')
            .then(res => {
                dispatch(loadReadings(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const fetchUserReadings = userId => {
    return (dispatch, getState) => {
        // let {currentUser} = getState();
        // const id = currentUser.user.id;
        return apiCall('get', `/readings/${userId}`)
            .then(res => {
                dispatch(loadReadings(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}

export const postNewReading = url => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/users/${id}/readings`, { url })
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
}