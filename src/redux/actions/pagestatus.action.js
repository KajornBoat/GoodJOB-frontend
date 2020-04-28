import {
  ACTION_PAGE_STATUS_LOGIN,
  ACTION_PAGE_STATUS_LOADING,
  ACTION_PAGE_STATUS_AVAILABLE,
} from "../constants";

export const setLoading = () => ({
  type: ACTION_PAGE_STATUS_LOADING,
});

export const setLogin = () => ({
  type: ACTION_PAGE_STATUS_LOGIN,
});

export const setAvailable = () => ({
  type: ACTION_PAGE_STATUS_AVAILABLE,
});
