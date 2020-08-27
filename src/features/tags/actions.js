import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import loader from '../loader';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { ADD_TAG, LOAD_TAGS } from '../actionTypes';

const { addError, addSuccess } = alerts.actions;
const { addLoader, removeLoader } = loader.actions;

export const addTag = user_id => ({
    type: ADD_TAG,
    user_id
});

export const removeTag = () => ({});
export const loadTags = tags => ({
    type: LOAD_TAGS,
    tags
});

export const fetchTags = (list, id) => {
    return (dispatch, getState) => {
        if (list === 'global') {
            dispatch(addLoader('tags'));
            return apiCall('get', `/tags`)
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.tags]), list));
                    dispatch(removeLoader('tags'));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(addError(err));
                });
        } else if (list === 'subscriptions') {
            dispatch(addLoader('tags'));
            let {currentUser} = getState();
            const id = currentUser.user.id;
            return apiCall('get', `/tags/${id}/subscriptions`)
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.tags]), list));
                    dispatch(removeLoader('tags'));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(addError(err));
                });
        } else if (id) {
            dispatch(addLoader('userTags'));
            return apiCall('get', `/tags/${id}`)
                .then(res => {
                    dispatch(receiveEntities(normalize(res, [schema.tags]), list));
                    dispatch(removeLoader('userTags'));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(addError(err.message));
                });
        }
    }
}

export const postNewTag = tags => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/tags`, { tags })
            .then(() => dispatch(addTag(user_id)))
            .catch(err => dispatch(addError(err.message)));
    }
}

// export const deleteTag = tag => {
//     return (dispatch, getState) => {
//         let { currentUser } = getState();
//         const user_id = currentUser.user.id;
//         return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
//             .then(() => dispatch(toggleFavorite(id, user_id))) // remove favorite from state
//             .catch(err => dispatch(addError(err.message)));
//     }
// }

const shouldFetchTags = (state, list) => {
    const tags = state.tagsByList[list];
    if (!tags) return true;
    
    // only initiates if there's tags
    const upToDate = state.tagsByList[list].upToDate;
    if (upToDate === false) return true;
}

export const fetchTagsIfNeeded = (list, id) => {
    return (dispatch, getState) => {
        if (shouldFetchTags(getState(), list)) {
            return dispatch(fetchTags(list, id));
        }
    }
}