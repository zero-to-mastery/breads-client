import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTION } from '../actionTypes';

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

export const postNewSubscription = pub_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const sub_id = currentUser.user.id;
    return apiCall('post', '/subscribe', { sub_id, pub_id })
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
}

// display user's subscriptions
export const fetchSubscriptions = () => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('get', `/subscriptions/${id}`)
            .then(res => {
                dispatch(loadSubscriptions(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}