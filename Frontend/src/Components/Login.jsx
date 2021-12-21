import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import "./../CSS/login.css";
import {useDispatch } from "react-redux";
import {UserLoginInfo} from "./Actions/LoginAction"

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [DataLoading, setDataLoading] = useState(false);

    // const UserLoginDetails = useSelector(state => state.isLoggedIn)
    // const {isLoggedIn} = UserLoginDetails;

    // console.log(isLoggedIn);

    useEffect(() => {
        setDataLoading(true);
    }, []);

    if (!DataLoading){
        return (
            <div className="loader">Loading...</div>
        );
    }


    // console.log(Email, Password);

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "content-Type" : "application/json",
            },
            body: JSON.stringify({
                Email,
                Password,
            })
        })

        // Checking status Send By server
        if (res.status === 201){
            dispatch(UserLoginInfo());
            window.alert("Login Successful");
            navigate("/", { replace: true })
        }
        else{
            window.alert("Invalid Credential");
        }
    }

    // Main Body Code
    return(
        <>
           <div id="main-container">
        <div className="login_container">
            {/* Image code  */}
            <div className="col-md-6 hidelogin">
               <img src="./Images/login.jpg" alt="Login" className="LoginsideImg"/>
            </div>
            {/* form code  */}
            <div className="col-md-6 col-sm-12">
              <div className="login-page">
                  <div className="login-form-container">
                      <h2 className="login-heading">Sign in to your account</h2>
                                      
                      <form method="POST">
                          <label htmlFor="email" className="labelinp">
                              <i className="fa fa-user">&nbsp; Email</i>
                              <input
                                  className="email-input"
                                  autoComplete="off"
                                  type="email"
                                  name="email"
                                  value={Email}
                                  onChange={(e) => {
                                      setEmail(e.target.value);
                                    }}
                                  id="email"
                                  placeholder="Enter your email"
                              />
                          </label>
                          <br />

                          <label htmlFor="password" className="labelinp passwordspace">
                                <i className="fa fa-lock">&nbsp; Password</i>
                                <input
                                    className="password-input"
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={Password}
                                    onChange={(e) => {
                                      setPassword(e.target.value);
                                    }}
                                    id="password"
                                  placeholder="Enter your password"
                                />
                          </label>
                          <br />
                          <div>
                              <p className="login-par-reg">Don't have account? <Link to="/register">Register</Link> </p>
                          </div>
                          <label htmlFor="submit" className="labelinp btn">
                            <input
                                type="submit"
                                name="login"
                                onClick={loginUser}
                                id="login"
                                className="btn btn-primary form-submit"
                                value="Sign In"
                            />
                          </label> 
                      </form>
                  </div>
               </div>
            </div>
        </div>
      </div>
        </>
    )
}

export default Login;