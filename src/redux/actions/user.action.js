import { ACTION_UPDATE_USER } from "../constant";

const setStateToUpdateUser = (payload) => ({
    type: ACTION_UPDATE_USER,
    payload
})

export const update_user = (payload) => {
    return dispatch => {
        dispatch(setStateToUpdateUser(payload));
    }
};