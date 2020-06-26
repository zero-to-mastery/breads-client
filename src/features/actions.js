export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES';
// export const SELECT_LIST = 'SELECT_LIST'
export const DELETE = 'DELETE';
// export const INVALIDATE_LIST = 'INVALIDATE_LIST'

// export function selectList(list) {
//   return {
//     type: SELECT_LIST,
//     list
//   }
// }

export const receiveEntities = (entities, list, id) => ({
    type: RECEIVE_ENTITIES,
    payload: entities,
    list,
    id
});

export const deleteReading = (list, id) => ({
  type: DELETE,
  list,
  id
});