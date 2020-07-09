import { apiCall } from '../../common/services/api';
import errors from '../errors';
import { LOAD_SUBSCRIPTIONS, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS } from './actionTypes';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';

export const loadSubscriptions = (users, id) => ({
    type: LOAD_SUBSCRIPTIONS,
    users,
    id
});

export const addSubscription = (id, user_id) => ({
    type: ADD_SUBSCRIPTION,
    id,
    user_id
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

export const removeSubscription = (sub_id, pub_id) => {
    return (dispatch, getState) => {
        const { readings } = getState()
        return apiCall('delete', `/users/${sub_id}/subscriptions/${pub_id}`)
            .then(() => {
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
        .then(() => dispatch(addSubscription(sub_id, user_id)))
        .catch(err => dispatch(errors.actions.addError(err.message)));
}

const shouldFetchSubscriptions = (state, id) => {
    const subscriptions = state.subscriptions[id];
    const upToDate = state.subscriptions.upToDate;
    if (upToDate !== true || !subscriptions) {
         return true;
    }
}

export const fetchSubscriptionsIfNeeded = id => {
    return (dispatch, getState) => {
        if (shouldFetchSubscriptions(getState(), id)) {
            return dispatch(fetchSubscriptions(id));
        }
    }
}