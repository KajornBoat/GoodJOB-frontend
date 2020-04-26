import { ACTION_JOB_HISTORY_SET } from "../constants";

export const setJobHistory = (payload) => ({
  type: ACTION_JOB_HISTORY_SET,
  payload,
});
