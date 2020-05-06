import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SUMMARY, REMOVE_SUMMARY } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadSummary = summary => ({
    type: LOAD_SUMMARY,
    summary
});

export const removeSummary = () => ({
    type: REMOVE_SUMMARY
});

export const fetchSummary = (reading_id) => {
    return dispatch => {
        dispatch(addLoader(reading_id));
        return apiCall('get', `/readings/${reading_id}/summary`)
            .then(res => {
                dispatch(loadSummary(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}