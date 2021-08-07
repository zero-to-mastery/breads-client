import { Entities, Readings } from "../actions";
import {
  RECEIVE_ENTITIES,
  ADD_READING,
  REMOVE_READING,
  REMOVE_SUBSCRIPTIONS,
  ADD_SUBSCRIPTION,
} from "../actionTypes";
import { AddReadingState, RemoveReadingState } from "../globalReadings/types";
import { ReadingListState, ReadingListActionTypes } from "./types";

const isReceiveEntitiesAction = (
  payload: any
): payload is { entities: Entities } => {
  return (payload as { entities: Entities }).entities.readings !== undefined;
};

const isAddReadingAction = (payload: any): payload is AddReadingState => {
  return (payload as AddReadingState).user_id !== undefined;
};

const isRemoveReadingAction = (payload: any): payload is RemoveReadingState => {
  return (payload as RemoveReadingState).reading_id !== undefined;
};

const getIds = (readings: Readings): number[] => {
  return Object.values(readings).map((reading) => reading.id);
};

/**
 * @todo Update once subscriptions types are added
 */
const readingsByList = (
  state: ReadingListState = {},
  action: ReadingListActionTypes
): ReadingListState => {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      if (isReceiveEntitiesAction(action.payload)) {
        const { entities } = action.payload;
        return {
          ...state,
          [action.list]: {
            upToDate: true,
            items: getIds(entities.readings),
          },
        };
      }
    /* falls through */
    case ADD_READING:
      if (isAddReadingAction(action.payload)) {
        const { user_id } = action.payload;
        if (state[user_id]) {
          return {
            ...state,
            global: {
              ...state.global,
              upToDate: false,
            },
            [user_id]: {
              ...state[user_id],
              upToDate: false,
            },
          };
        } else {
          return {
            ...state,
            global: {
              ...state.global,
              upToDate: false,
            },
          };
        }
      }
    /* falls through */
    case REMOVE_READING:
      if (isRemoveReadingAction(action.payload)) {
        const { reading_id, user_id } = action.payload;
        if (state["global"]) {
          return {
            ...state,
            [user_id]: {
              upToDate: true,
              items: state[user_id].items.filter((sub) => sub !== reading_id),
            },
            global: {
              upToDate: true,
              items: state["global"].items.filter((id) => id !== reading_id),
            },
          };
        } else {
          return {
            ...state,
            [user_id]: {
              upToDate: true,
              items: state[user_id].items.filter((sub) => sub !== reading_id),
            },
          };
        }
      }
    /* falls through */
    case ADD_SUBSCRIPTION:
      if (state.subscriptions) {
        return {
          ...state,
          subscriptions: {
            ...state.subscriptions,
            upToDate: false,
          },
        };
      }
    /* falls through */
    case REMOVE_SUBSCRIPTIONS:
      if (state.subscriptions && action.id && action.user_id) {
        const filteredSubReadings = state.subscriptions.items
          .map((id) => action.readings[id])
          .filter((reading) => reading.reader !== action.id)
          .map((reading) => reading.id);
        return {
          ...state,
          subscriptions: {
            upToDate: true,
            items: [...filteredSubReadings],
          },
        };
      }
    /* falls through */
    default:
      return state;
  }
};

export default readingsByList;
