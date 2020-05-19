import { LOAD_READINGS, REMOVE_READING } from '../actionTypes';

const reading = (state={data: [], websites: []}, action) => {
    switch (action.type) {
        case LOAD_READINGS:
            console.log({...action.readings});
            // return [action.readings];
            return {...action.readings};
        case REMOVE_READING:
            return {
                data: state[0].data.filter(reading => reading.id !== action.id),
                websites: state[0].websites
            };
        default:
            return state;
    }
}

export default reading;