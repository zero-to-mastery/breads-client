import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { LOAD_SUBSCRIPTION_READINGS } from './actionTypes';
import { addLoader, removeLoader } from '../loader/actions';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';

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
                // console.log(res);
                // console.log(
                //     'normalized data',
                //     normalize(res, [schema.reading])
                // )
                dispatch(receiveEntities('subscriptions', normalize(res, [schema.reading])));
                // dispatch(loadSubscriptionReadings(res));
                dispatch(removeLoader('subReadings'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

const shouldFetchSubscriptionReadings = (state, list) => {
    const readings = state.readingsByList[list];
    if (!readings) {
         return true;
    }
    // else if (loader.isLoading) {
    //      return false;
    // }
}

export const fetchSubscriptionReadingsIfNeeded = (list) => {
    return (dispatch, getState) => {
        if (shouldFetchSubscriptionReadings(getState(), list)) {
            return dispatch(fetchSubscriptionReadings());
        }
    }
}