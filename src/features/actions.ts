import { RECEIVE_ENTITIES } from './actionTypes';

export interface ReceiveEntitiesAction {
    type: typeof RECEIVE_ENTITIES
    payload: {
        entities: any
    }
    list: any
    id?: any
}

export const receiveEntities = (entities: any, list?: any, id?: any): ReceiveEntitiesAction => ({
    type: RECEIVE_ENTITIES,
    payload: entities,
    list,
    id
});