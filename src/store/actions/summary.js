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

// export const removeSummary = () => {
//     return dispatch => {
//         try {
//             return dispatch(removeSummary());
//         }
//         catch (err) {
//             return dispatch(addError(err.message));
//         }
//     };
// };

export const fetchSummary = (reading_id) => {
    return dispatch => {
        return apiCall('get', `/summary/${reading_id}`)
            .then(res => {
                dispatch(loadSummary(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}