import { RECEIVE_ENTITIES } from './actionTypes';

export const receiveEntities = (entities, list, id) => ({
    type: RECEIVE_ENTITIES,
    payload: entities,
    list,
    id
});