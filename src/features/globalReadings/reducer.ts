import { Entities, Readings } from "../actions";
import {
  RECEIVE_ENTITIES,
  REMOVE_READING,
  TOGGLE_FAVORITE,
} from "../actionTypes";
import { FavoriteState, ReadingActionTypes, RemoveReadingState } from "./types";

export interface GlobalReadingState {
  [k: string]: Readings;
}

const isReceiveEntitiesAction = (
  payload: any
): payload is { entities: Entities } => {
  return (payload as { entities: Entities }).entities.readings !== undefined;
};

const isToggleFavoriteAction = (payload: any): payload is FavoriteState => {
  return (payload as FavoriteState).user_id !== undefined;
};

const isRemoveReadingAction = (payload: any): payload is RemoveReadingState => {
  return (payload as RemoveReadingState).reading_id !== undefined;
};

const reading = (
  state: GlobalReadingState = {},
  action: ReadingActionTypes
) => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      if (isReceiveEntitiesAction(action.payload)) {
        const { entities } = action.payload;
        return { ...state, ...entities.readings };
      }
    /* falls through */
    case TOGGLE_FAVORITE:
      if (isToggleFavoriteAction(action.payload)) {
        const { id, user_id } = action.payload;
        const reading = state[id];
        return {
          ...state,
          [id]: {
            ...reading,
            favorite: reading.favorite === null ? user_id : null,
          },
        };
      }
    /* falls through */
    case REMOVE_READING:
      if (isRemoveReadingAction(action.payload)) {
        const { reading_id } = action.payload;
        const { [reading_id]: value, ...other } = state;
        return other;
      }
    /* falls through */
    default:
      return state;
  }
};

export default reading;
