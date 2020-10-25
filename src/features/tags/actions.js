import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import loader from '../loader';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { ADD_TAG, LOAD_TAGS } from '../actionTypes';

const { addAlert } = alerts.actions;
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
                    dispatch(addAlert({message: err.message, type: 'danger'}));
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
                    dispatch(addAlert({message: err.message, type: 'danger'}));
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
                    dispatch(addAlert({message: err.message, type: 'danger'}));
                });
        }
    }
}

export const postNewTags = (reading_url, tags) => {
    return (dispatch, getState) => {
        dispatch(addLoader('addTag'));
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/tags/${user_id}`, { reading_url, tags })
            .then(() => {
                dispatch(addTag(user_id));
                dispatch(removeLoader('addTag'));
                dispatch(addAlert({message: 'Tags updated', type: 'success'}));
            })
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    }
}

export const updateTags = (reading_url, add_tags, delete_tags) => {
    return (dispatch, getState) => {
        dispatch(addLoader('updateTag'));
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('put', `/tags/${user_id}`, { reading_url, add_tags, delete_tags })
            .then(() => {
                dispatch(addTag(user_id));
                dispatch(removeLoader('updateTag'));
                dispatch(addAlert({message: 'Tags updated', type: 'success'}));
            })
            .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
    }
}

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