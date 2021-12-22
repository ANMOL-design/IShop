import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../Constants/constants";

// Action for Login/Logout Page
const UserLoginInfo = (bool) => (dispatch, getState) => {
    const { isLoggedIn: { LoggedDetail } } = getState();
    localStorage.setItem("IsLoggedIn", LoggedDetail);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: bool });
}

const UserLogoutInfo = (bool) => (dispatch, getState) => {
    const { isLoggedIn: { LoggedDetail } } = getState();
    localStorage.setItem("IsLoggedIn", LoggedDetail);
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: bool });
}

export { UserLoginInfo, UserLogoutInfo };