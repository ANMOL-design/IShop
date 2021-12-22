import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {UserLogoutInfo} from "./Actions/LoginAction"

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // const UserLoginDetails = useSelector(state => state.isLoggedIn)
    // const {isLoggedIn} = UserLoginDetails;
    // console.log(isLoggedIn);


    useEffect(() => {
    async function fetchData(){
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
                
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

            else{
                dispatch(UserLogoutInfo(Boolean(false)));
                navigate("/login", { replace: true })
            }
        } 
        catch (err) {
            console.log(err);
        }
    }
    fetchData();
    }, [])
    return(
        <div className="loader">
            User Is Logged Out Successfully.
        </div>
    )
}

export default Logout;