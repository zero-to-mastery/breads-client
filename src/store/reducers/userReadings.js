import { LOAD_USER_READINGS, REMOVE_USER_READING } from '../actionTypes';

const reading = (state={data: [], websites: []}, action) => {
    switch (action.type) {
        case LOAD_USER_READINGS:
            return {...action.readings};
        case REMOVE_USER_READING:
            return {
                data: state.data.filter(reading => reading.id !== action.id),
                websites: state.websites
            };
        default:
            return state;
    }
}

export default reading;