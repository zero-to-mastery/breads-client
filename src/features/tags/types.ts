import { ADD_TAG, REMOVE_TAG, RECEIVE_ENTITIES } from "../actionTypes";
import { ReceiveEntitiesAction } from "./../actions";

export type TagsState = any;

export type TagsActionTypes =
  | ReceiveEntitiesAction
  | AddTagAction
  | RemoveTagAction;

interface AddTagAction {
  type: typeof ADD_TAG;
  id: number;
  user_id: number | null;
}

interface RemoveTagAction {
  type: typeof REMOVE_TAG;
  id: number;
  user_id: number | null;
}

export interface Tags {
  [k: string]: {
    id: number;
    tag_name: string;
    date: string;
    count: number;
  };
}
