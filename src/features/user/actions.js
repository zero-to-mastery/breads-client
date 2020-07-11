import { apiCall } from '../../common/services/api';
import errors from '../errors';
import { LOAD_USER } from '../actionTypes';

const { addError } = errors.actions;

export const loadUser = user => ({
    type: LOAD_USER,
    user
});

export const fetchUser = id => {
    return dispatch => {
        return apiCall('get', `/users/${id}`)
            .then(res => dispatch(loadUser(res)))
            .catch(err => dispatch(addError(err.message)));
    }
}