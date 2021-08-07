import { LOAD_SUMMARY, REMOVE_SUMMARY } from "../actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_SUMMARY:
      return { ...action.summary };
    case REMOVE_SUMMARY:
      return {};
    default:
      return state;
  }
};
