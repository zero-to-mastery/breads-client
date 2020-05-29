import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTIONS } from '../actionTypes';

export const loadSubscriptions = users => ({
    type: LOAD_SUBSCRIPTIONS,
    users
});

export const removeSubscriptions = id => ({
    type: REMOVE_SUBSCRIPTIONS,
    id
});

export const removeSubscription = (sub_id, pub_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${sub_id}/subscriptions/${pub_id}`)
            .then(() => {
                dispatch(removeSubscriptions(pub_id))
            })
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

// export const fetchUsers = () => {
//     return (dispatch, getState) => {
//         const { users } = getState();
//         if (users.length === 0) {
//             return apiCall('get', '/users')
//             .then(res => {
//                 console.log('FETCH');
//                 dispatch(loadUsers(res));
//             })
//             .catch(err => {
//                 dispatch(addError(err.message));
//             });
//         }
        
//     }
// }

export const fetchSubscriptions = user_id => {
    return dispatch => {
        return apiCall('get', `/users/${user_id}/subscriptions`)
            .then(res => {
                dispatch(loadSubscriptions(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}


// SHOULD THESE BE IN AUTH???
export function sendResetEmail(email) {
    return dispatch => {
        return apiCall('post', '/users/reset', { email })
            .then(res => {})
            .catch(err => {
                dispatch(addError(err.message));
            });
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