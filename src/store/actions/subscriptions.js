import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTION } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadSubscriptions = subscriptions => ({
    type: LOAD_SUBSCRIPTIONS,
    subscriptions
});

export const removeSubscriptions = id => ({
    type: REMOVE_SUBSCRIPTION,
    id
});

export const removeSubscription = (sub_id, pub_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${sub_id}/subscriptions/${pub_id}`)
            .then(() => dispatch(removeSubscriptions(pub_id)))
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const postNewSubscription = sub_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall('post', `/users/${user_id}/subscriptions`, { sub_id })
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
}

export const fetchSubscriptionReadings = () => {
    return (dispatch, getState) => {
        dispatch(addLoader('subReadings'));
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('get', `/readings/${id}/subscriptions`)
            .then(res => {
                dispatch(loadSubscriptions(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}