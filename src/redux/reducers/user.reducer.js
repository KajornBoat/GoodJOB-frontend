import { ACTION_UPDATE_USER } from "../constant"

const initialState = {
    name : "Kajorn Boonjaroen",
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ACTION_UPDATE_USER:
        return { ...state, name: payload }

    default:
        return state
    }
}
