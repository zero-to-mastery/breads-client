import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_FAVORITES } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadFavorites = favorites => ({
    type: LOAD_FAVORITES,
    favorites
})

export const fetchFavoriteReadings = userId => {
    return dispatch => {
        dispatch(addLoader('favoriteReadings'));
        return apiCall('get', `/readings/${userId}/favorites`)
            .then(res => {
                dispatch(loadFavorites(res));
                dispatch(removeLoader('favoriteReadings'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}