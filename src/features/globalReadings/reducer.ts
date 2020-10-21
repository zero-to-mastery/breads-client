import { Readings } from '../actions';
import { RECEIVE_ENTITIES, REMOVE_READING, TOGGLE_FAVORITE } from '../actionTypes';
import { FavoriteState, ReadingActionTypes, ReadingState } from './types';

export interface GlobalReadingState {
    [k: string]: Readings
}

const reading = (state: GlobalReadingState = {}, action: ReadingActionTypes) => {
    switch (action.type) {
        case RECEIVE_ENTITIES:
            const { entities } = action.payload;
            if (entities && entities.readings) {
                return { ...state, ...entities.readings }
            }
            /* falls through */
        case TOGGLE_FAVORITE: 
            const { id, user_id } = action.payload as FavoriteState;
            if (id && user_id) {
                const reading = state[id];
                return {
                    ...state,
                    [id]: {
                        ...reading,
                        favorite: reading.favorite === null ? user_id : null
                    }
                }
            }
            /* falls through */
        case REMOVE_READING:
            const { reading_id } = action.payload as ReadingState;
            if (reading_id !== undefined) {
                const { [reading_id]: value, ...other } = state;
                return other;
            }
            /* falls through */
        default:
            return state;
    }
}

export default reading;