import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_USERS } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadUsers = users => ({
    type: LOAD_USERS,
    users
});

export const fetchUsers = () => {
    return (dispatch, getState) => {
        const { users } = getState();
        if (users.length === 0) {
            return apiCall('get', '/users')
            .then(res => {
                console.log('FETCH');
                dispatch(loadUsers(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
        }
        
    }
}

export const fetchSubscriptions = user_id => {
    return dispatch => {
        return apiCall('get', `/users/${user_id}/subscriptions`)
            .then(res => {
                dispatch(loadUsers(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const searchUsers = search => {
    return dispatch => {
        dispatch(addLoader());
        return apiCall('get', `/users/search?users=${search}`)
            .then(res => {
                dispatch(loadUsers(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export function sendResetEmail(email) {
    return dispatch => {
        // return new Promise((resolve, reject) => {
            return apiCall('post', '/users/reset', { email })
                .then(res => {})
                .catch(err => {
                    dispatch(addError(err.message));
                    // reject();
                });
        // });
    }
}

export function resetPassword(username, token, password) {
    return dispatch => {
        return apiCall('post', `/users/${username}/reset/${token}`, { password })
            .then(res => {})
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}