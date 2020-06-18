import { LOAD_USER_READINGS, REMOVE_USER_READING, ADD_FAVORITE, REMOVE_FAVORITE } from './actionTypes';

const reading = (state={data: [], websites: []}, action) => {
    switch (action.type) {
        case LOAD_USER_READINGS:
            return {...action.readings};
        case REMOVE_USER_READING:
            return {
                data: state.data.filter(reading => reading.id !== action.id),
                websites: state.websites
            };
        case ADD_FAVORITE:
            return {
                data: state.data.map(reading =>
                        (reading.id === action.id) 
                        ? {...reading, favorite: reading.user_id}
                        : reading),
                websites: state.websites
            }
        case REMOVE_FAVORITE:
            return {
                data: state.data.map(reading =>
                        (reading.id === action.id) 
                        ? {...reading, favorite: null}
                        : reading),
                websites: state.websites
            }
        default:
            return state;
    }
}

export default reading;