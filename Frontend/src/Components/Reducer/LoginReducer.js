import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../Constants/constants";

function LoginLogoutDetailsReducer(state = { LoggedDetail: false }, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { LoggedDetail: state.LoggedDetail = action.payload };
        case USER_LOGOUT_SUCCESS:
            return { LoggedDetail: state.LoggedDetail = action.payload };
        default:
            return state;
    }
}

export { LoginLogoutDetailsReducer };