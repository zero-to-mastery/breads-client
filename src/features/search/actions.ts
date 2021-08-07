import { apiCall } from "../../common/services/api";
import alerts from "../alerts";
import loader from "../loader";
import { LOAD_SEARCH_RESULTS } from "../actionTypes";
import {
  SearchActionTypes,
  SearchAllAction,
  SearchState,
  SearchUsersAction,
} from "./types";

const { addAlert } = alerts.actions;
const { addLoader, removeLoader } = loader.actions;

export const loadSearchResults = (results: SearchState): SearchActionTypes => ({
  type: LOAD_SEARCH_RESULTS,
  payload: results,
});

export const searchAll = (): SearchAllAction => async (dispatch) => {
  dispatch(addLoader("search"));
  return apiCall("get", `/search`)
    .then((res) => {
      dispatch(loadSearchResults(res));
      dispatch(removeLoader("search"));
    })
    .catch((err) => {
      dispatch(addAlert({ message: err.message, type: "danger" }));
    });
};

export const searchUsers =
  (search: string): SearchUsersAction =>
  async (dispatch) => {
    dispatch(addLoader("search"));
    return apiCall("get", `/search/users?users=${search}`)
      .then((res) => {
        dispatch(loadSearchResults(res));
        dispatch(removeLoader("search"));
      })
      .catch((err) => {
        dispatch(addAlert({ message: err.message, type: "danger" }));
      });
  };
