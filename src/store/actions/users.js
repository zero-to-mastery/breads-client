import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_USERS } from '../actionTypes';//, FILTER_USERS

export const loadUsers = users => ({
    type: LOAD_USERS,
    users
});

// export const filterUsers = users => ({
//     type: FILTER_USERS,
//     users
// });

export const fetchUsers = () => {
    return (dispatch, getState) => {
        const { users } = getState();
        console.log(users);
        if (users.length === 0) { // don't run if users has been filtered
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

export const fetchPubs = user_id => {
    return dispatch => {
        return apiCall('get', `/users/${user_id}`)
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
        return apiCall('get', `/search/${search}`)
            .then(res => {
                dispatch(loadUsers(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}