import {
  ACTION_PAGE_STATUS_LOADING,
  ACTION_PAGE_STATUS_LOGIN,
  ACTION_PAGE_STATUS_AVAILABLE,
  ACTION_PAGE_STATUS_FIRST,
} from "../constants";

const initialState = {
  status: "loading",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_PAGE_STATUS_AVAILABLE:
      return { ...state, status: "available" };
    case ACTION_PAGE_STATUS_LOADING:
      return { ...state, status: "loading" };
    case ACTION_PAGE_STATUS_LOGIN:
      return { ...state, status: "login" };
    case ACTION_PAGE_STATUS_FIRST:
      return { ...state, status: "first" };
    default:
      return state;
  }
};
