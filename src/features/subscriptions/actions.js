import { apiCall } from '../../common/services/api';
import errors from '../errors';
import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTIONS } from './actionTypes';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';

export const loadSubscriptions = (users, id) => ({
    type: LOAD_SUBSCRIPTIONS,
    users,
    id
});

export const removeSubscriptions = (id, user_id, readings) => ({
    type: REMOVE_SUBSCRIPTIONS,
    id,
    user_id,
    readings
});

export const fetchSubscriptions = user_id => {
    return dispatch => {
        return apiCall('get', `/users/${user_id}/subscriptions`)
            .then(res => {
                dispatch(receiveEntities(normalize(res, [schema.user]), user_id, user_id));
            })
            .catch(err => {
                dispatch(errors.actions.addError(err.message));
            });
    }
}

// ADD SUBSCRIPTION

export const removeSubscription = (sub_id, pub_id) => {
    return (dispatch, getState) => {
        const { readings } = getState()
        return apiCall('delete', `/users/${sub_id}/subscriptions/${pub_id}`)
            .then(() => {
                console.log(pub_id);
                dispatch(removeSubscriptions(pub_id, sub_id, readings))
            })
            .catch(err => {
                dispatch(errors.actions.addError(err.message));
            });
    }
}

export const postNewSubscription = sub_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall('post', `/users/${user_id}/subscriptions`, { sub_id })
        .then(res => {})
        .catch(err => dispatch(errors.actions.addError(err.message)));
}