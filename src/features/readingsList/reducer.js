import { RECEIVE_ENTITIES, DELETE } from "../actions";

const getIds = (readings) => {
    return Object.values(readings).map(reading => reading.id);
}

const readingsByList = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, [action.list]: getIds(entities.readings) };
            }
        // case DELETE:
        //     const list = state[action.list];
        //     const filtered = list.filter(id => id !== action.id);
        //     console.log(filtered);
        //     return {...state, [action.list]: filtered};
        default:
            return state
   }
}


export default readingsByList;