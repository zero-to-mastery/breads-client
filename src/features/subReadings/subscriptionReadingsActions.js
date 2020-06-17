import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { LOAD_SUBSCRIPTION_READINGS } from './actionTypes';
import { addLoader, removeLoader } from '../loader/loadingAction';

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
                dispatch(removeLoader('subReadings'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}