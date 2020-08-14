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

export const fetchTags = (reading_id, user_id) => {
    return dispatch => {
        return apiCall('get', `/tags`)
            .then(res => dispatch(receiveEntities(normalize(res, [schema.tags]))))
            // .then(res => dispatch(loadTags(res)))
            .catch(err => {
                console.log(err);
                dispatch(addError(err));
            });
    }
}