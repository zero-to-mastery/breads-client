import { apiCall, setTokenHeader } from '../../common/services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import alerts from '../alerts';

const { addError, addSuccess } = alerts.actions;

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData) {
    return dispatch => {
        // wrap thunk in promise so we can wait for API call
        return new Promise((resolve, reject) => {
            return apiCall('post', `/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationToken(token)
                    dispatch(setCurrentUser(user));
                    // dispatch(removeError());
                    resolve(); // indicate that the API call succeeded
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(); // indicate the API call failed
                });
        });
    }
}

export const updateUser = (id, image, username) => {
    return dispatch => {
        return apiCall('put', `/users/${id}`, {image, username})
            .then(user => {
                dispatch(setCurrentUser(user));
                dispatch(addSuccess('Successfully updated'));
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export function sendResetEmail(email) {
    return dispatch => {
        return apiCall('post', '/users/reset', { email })
            .then(() => {})
            .catch(err => dispatch(addError(err.message)));
    }
}

export function resetPassword(username, token, password) {
    return dispatch => {
        return apiCall('post', `/users/${username}/reset/${token}`, { password })
            .then(() => {})
            .catch(err => dispatch(addError(err.message)));
    }
}