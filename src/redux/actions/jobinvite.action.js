import { ACTION_JOB_INVITE_SET } from "../constants";

export const setJobInvite = (payload) => ({
  type: ACTION_JOB_INVITE_SET,
  payload,
});
