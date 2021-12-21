import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../Constants/constants";

// Action for Login/Logout Page
const UserLoginInfo = () => (dispatch) => {

    dispatch({ type: USER_LOGIN_SUCCESS, payload: true });
}

const UserLogoutInfo = () => (dispatch) => {

    dispatch({ type: USER_LOGOUT_SUCCESS, payload: false });
}

export { UserLoginInfo, UserLogoutInfo };