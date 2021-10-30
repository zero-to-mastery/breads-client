import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../rootReducer";
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
  [k: string]: Tag;
}

export interface Tag {
  id: number;
  tag_name: string;
  date: string;
  count: number;
  user_id: string;
}

export type fetchingTags = ThunkAction<
  Promise<any> | undefined,
  RootState,
  unknown,
  Action
>;

export type postingNewTags = ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  Action
>;

export type updatingTags = ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  Action
>;

export type fetchingTagsIfNeeded = ThunkAction<
  Promise<any> | undefined,
  RootState,
  unknown,
  Action
>;
