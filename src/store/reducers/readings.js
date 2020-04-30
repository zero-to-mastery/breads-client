import { LOAD_READINGS, REMOVE_READING } from '../actionTypes';

const reading = (state=[], action) => {
    switch (action.type) {
        case LOAD_READINGS:
            return [action.readings];
        case REMOVE_READING:
            return [{
                data: state[0].data.filter(reading => reading.id !== action.id),
                websites: state[0].websites
            }];
        default:
            return state;
    }
}

export default reading;