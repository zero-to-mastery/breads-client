import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SUBSCRIPTION_READINGS } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadSubscriptionReadings = subscriptions => ({
    type: LOAD_SUBSCRIPTION_READINGS,
    subscriptions
});

export const fetchSubscriptionReadings = () => {
    return (dispatch, getState) => {
        dispatch(addLoader('subReadings'));
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('get', `/readings/${id}/subscriptions`)
            .then(res => {
                dispatch(loadSubscriptionReadings(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}