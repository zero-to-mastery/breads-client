import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import { LOAD_USER } from '../actionTypes';

const { addError } = alerts.actions;

export const loadUser = user => ({
    type: LOAD_USER,
    user
});

export const fetchUser = id => {
    return dispatch => {
        return apiCall('get', `/users/${id}`)
            .then(res => dispatch(loadUser(res)))
            .catch(err => dispatch(addError(err)));
    }
}
const shouldFetchUser = (state, id) => {
    const user = state.user[id];
    if (!user) return true;
}

export const fetchUserIfNeeded = id => {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState(), id)) {
            return dispatch(fetchUser(id));
        }
    }
}