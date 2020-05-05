import { ACTION_JOB_EMPLOYER_SET, ACTION_JOB_EMPLOYEE_SET, ACTION_JOB_ACCEPT_EMPLOYEE_SET, ACTION_JOB_APPLY_EMPLOYEE_SET, ACTION_JOB_SELECT_EMPLOYEE_SET } from "../constants";

export const setJobEmployer = (payload) => ({
  type: ACTION_JOB_EMPLOYER_SET,
  payload,
});
export const setAllEmployee = (payload) => ({
  type: ACTION_JOB_EMPLOYEE_SET,
  payload,
});
export const setAcceptEmployee = (payload) => ({
  type: ACTION_JOB_ACCEPT_EMPLOYEE_SET,
  payload,
});
export const setApplyEmployee = (payload) => ({
  type: ACTION_JOB_APPLY_EMPLOYEE_SET,
  payload,
});
export const setSelectEmployee = (payload) => ({
  type: ACTION_JOB_SELECT_EMPLOYEE_SET,
  payload,
});



