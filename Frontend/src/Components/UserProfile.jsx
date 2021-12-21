import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./../CSS/profile.css";
import Boy from "./Images/Boy.png";

const AboutUser = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [DataLoading, setDataLoading] = useState(false);
    const callAboutPage = async () => {
        try {
            const res = await fetch("/aboutuser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            const data = await res.json();
                
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

            console.log(data);
            setUserData(data);
            setDataLoading(true);
        } 
        catch (err) {
            console.log(err);
            navigate("/login", { replace: true })
        }
    };
    
    useEffect(() => {
        callAboutPage();
    }, []);

    if (!DataLoading){
        return (
            <div className="loader">Loading...</div>
        );
    }
     
    return (
        <>
            <div className="container-fluid profile-container">
                <div className="aboutuser-img-container">
                    <img src={Boy} alt="User" />
                </div>
                <div className="aboutuser-container">
                    <h1 className="profile-head">Profile</h1>

                    <h4 className="nameuser user-text">
                      <span className="UserLabel">User Id : </span>
                      <span className="userinfo">{userData._id}</span>
                    </h4>

                    <h4 className="nameuser user-text">
                      <span className="UserLabel">Name : </span>
                      <span className="userinfo">{userData.name}</span>
                    </h4>

                    <h4 className="emailuser user-text">
                      <span className="UserLabel">Email Id : </span>
                      <span className="userinfo"> {userData.email}</span>
                    </h4>

                    <h4 className="numuser user-text">
                      <span className="UserLabel">Phone no : </span>
                      <span className="userinfo"> {userData.number}</span>
                    </h4>
                </div>
            </div>     
        </>
    );  
}

export default AboutUser;
