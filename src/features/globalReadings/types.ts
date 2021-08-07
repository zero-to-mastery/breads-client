import { ReceiveEntitiesAction } from "../actions";
import { ADD_READING, REMOVE_READING, TOGGLE_FAVORITE } from "../actionTypes";
import { AlertActionTypes } from "../alerts/types";

export interface FavoriteState {
  id: any;
  user_id: any;
}

interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: FavoriteState;
}

export interface AddReadingState {
  user_id: any;
}

export type RemoveReadingState = AddReadingState & {
  reading_id: string;
};

interface AddReadingAction {
  type: typeof ADD_READING;
  payload: AddReadingState;
}

interface RemoveReadingAction {
  type: typeof REMOVE_READING;
  payload: RemoveReadingState;
}

export type ReadingActionTypes =
  | ReceiveEntitiesAction
  | ToggleFavoriteAction
  | AddReadingAction
  | RemoveReadingAction;

export type PromiseReturnTypes = ReadingActionTypes | AlertActionTypes | void;
