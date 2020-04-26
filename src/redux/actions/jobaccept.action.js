import { ACTION_JOB_ACCEPT_SET } from "../constants";

export const setJobAccept = (payload) => ({
  type: ACTION_JOB_ACCEPT_SET,
  payload,
});
