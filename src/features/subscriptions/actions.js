import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import { LOAD_SUBSCRIPTIONS, ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS } from '../actionTypes';

const { addAlert } = alerts.actions;

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

export const removeSubscriptions = (id, user_id) => ({
    type: REMOVE_SUBSCRIPTIONS,
    id,
    user_id
});

export const fetchSubscriptions = user_id => {
    return dispatch => {
        return apiCall('get', `/users/${user_id}/subscriptions`)
            .then(res => dispatch(loadSubscriptions(res, user_id)))
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    }
}

export const removeSubscription = (sub_id, pub_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${sub_id}/subscriptions/${pub_id}`)
            .then(() => {
                dispatch(removeSubscriptions(pub_id, sub_id));
                dispatch(addAlert({message: 'Successfully unfollowed', type: 'success'}));
            })
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    }
}

export const postNewSubscription = sub_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall('post', `/users/${user_id}/subscriptions`, { sub_id })
        .then(() => {
            dispatch(addSubscription(sub_id, user_id));
            dispatch(addAlert({message: 'Successfully followed', type: 'success'}));
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
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