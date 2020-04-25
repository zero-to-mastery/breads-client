import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SUMMARY, REMOVE_SUMMARY } from '../actionTypes';

export const loadSummary = summary => ({
    type: LOAD_SUMMARY,
    summary
});

export const removeSummary = () => ({
    type: REMOVE_SUMMARY
});

export const fetchSummary = (reading_id) => {
    return dispatch => {
        return apiCall('get', `/readings/${reading_id}/summary`)
            .then(res => {
                dispatch(loadSummary(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}