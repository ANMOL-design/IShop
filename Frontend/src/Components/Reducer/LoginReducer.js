import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../Constants/constants";

function LoginLogoutDetailsReducer(state = { isLoggedIn: false }, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { isLoggedIn: action.payload };
        case USER_LOGOUT_SUCCESS:
            return { isLoggedIn: action.payload };
        default:
            return state;
    }
}

export { LoginLogoutDetailsReducer };