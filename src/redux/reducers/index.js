import { combineReducers } from "redux";

import userReducer from "./user.reducer";
import jobApplyReducer from "./jobapply.reducer";
import jobAcceptReducer from "./jobaccept.reducer";
import jobInviteReducer from "./jobinvite.reducer";
import jobStatusReducer from "./jobstatus.reducer";
import jobHistoryReducer from "./jobhistory.reducer";
import jobEmployerReducer from "./jobemployer.reducer";
import inviteEmployeeReducer from "./inviteemployee.reducer";
export default combineReducers({
  userReducer,
  jobApplyReducer,
  jobAcceptReducer,
  jobInviteReducer,
  jobStatusReducer,
  jobHistoryReducer,
  jobEmployerReducer,
  inviteEmployeeReducer,
});
