export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES';

export const receiveEntities = (entities, list, id) => ({
    type: RECEIVE_ENTITIES,
    payload: entities,
    list,
    id
});