import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { LOAD_SEARCH_RESULTS } from "../actionTypes";
import { RootState } from "../rootReducer";

export type SearchState = any;

interface LoadSearchResultsAction {
  type: typeof LOAD_SEARCH_RESULTS;
  payload: SearchState;
}

export type SearchAllAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action
>;
export type SearchUsersAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action
>;

export type SearchActionTypes = LoadSearchResultsAction;
