import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import loader from '../loader';
import { receiveEntities } from '../actions';
import { normalize } from 'normalizr';
import * as schema from '../../common/services/schema';
import { LOAD_TAGS } from '../actionTypes';

const { addError, addSuccess } = alerts.actions;
const { addLoader, removeLoader } = loader.actions;

export const addTags = () => ({});
export const removeTags = () => ({});
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
                    dispatch(receiveEntities(normalize(res, [schema.tags])));
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
                    dispatch(receiveEntities(normalize(res, [schema.tags])));
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
                    dispatch(receiveEntities(normalize(res, [schema.tags])));
                    dispatch(removeLoader('userTags'));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(addError(err.message));
                });
        }
    }
}

// const shouldFetchTags = (state, list) => {
//     const tags = state.tagsByList[list];
//     if (!tags) return true;
    
//     // only initiates if there's tags
//     const upToDate = state.tagsByList[list].upToDate;
//     if (upToDate === false) return true;
// }

// export const fetchTagsIfNeeded = (list, id) => {
//     return (dispatch, getState) => {
//         if (shouldFetchTags(getState(), list)) {
//             return dispatch(fetchTags(list, id));
//         }
//     }
// }