import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_USER_READINGS, REMOVE_USER_READING } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadUserReadings = readings => ({
    type: LOAD_USER_READINGS,
    readings
});

export const removeUserReadings = id => ({
    type: REMOVE_USER_READING,
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

export const fetchUserReadings = userId => {
    return dispatch => {
        dispatch(addLoader('userReadings'));
        return apiCall('get', `/readings/${userId}`)
            .then(res => {
                dispatch(loadUserReadings(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}