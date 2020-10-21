import { ReceiveEntitiesAction } from '../actions';
import { ADD_READING, REMOVE_READING, TOGGLE_FAVORITE } from '../actionTypes';

export interface FavoriteState {
    id: any
    user_id: any
}

interface ToggleFavoriteAction {
    type: typeof TOGGLE_FAVORITE
    payload: FavoriteState
}

export interface ReadingState {
    reading_id?: string
    user_id: any
}

interface AddReadingAction {
    type: typeof ADD_READING
    payload: ReadingState
}

interface RemoveReadingAction {
    type: typeof REMOVE_READING
    payload: ReadingState
}

export type ReadingActionTypes = ReceiveEntitiesAction | ToggleFavoriteAction | AddReadingAction | RemoveReadingAction;