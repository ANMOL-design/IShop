import React from "react";
import "./../CSS/header.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import profileImg from "./Images/Web/profile_icon.svg";
import bagImg from "./Images/Web/bag_icon.svg";
import Logo from "./Images/Web/iSHOP_Logo.svg";
import HamBurgerIcon from "./Images/Web/hamburger_icon.svg";
import { useSelector} from "react-redux";

function Header(){

    const toggleBox = () => {
        var element = document.getElementsByClassName("header-links-container")[0];
      //   console.log(element)
        element.classList.toggle("navbarHide");
       
    };

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    var totalPrice = cartItems.reduce( (a, c) => a + c.price * c.qty, 0);

    const IsLoggedIn = useSelector(state => state.isLoggedIn);
    console.log(IsLoggedIn);
    var {LoggedDetail} = IsLoggedIn;

    if (typeof LoggedDetail !== Boolean){
        LoggedDetail = Boolean(LoggedDetail);
    }

    console.log(LoggedDetail);

    return(
        <>
          {/* Top part Of header  */}
          <div className="heading-top-container">
            {/* Division 1 for en and $  */}
            <div className="header-profile-container">
                {!LoggedDetail ? <><Link to="/login">Login</Link><Link to="/register">Register</Link></> :
                    <Link to="/logout">Logout</Link>
                }
            </div>
            {/* Division 2 for My Profile  */}
            <div className="header-profile-container">
                <span>
                    <img src={profileImg} alt="Profile" />&nbsp;
                    <Link to="/profile" style={{paddingLeft: "2px"}}>My Profile</Link>
                </span>

                <span>
                    <Link to="/cart"><img src={bagImg} alt="Profile" />&nbsp;{cartItems.length} item <span style={{color: "#c0c0c0", paddingLeft: "4px"}}>${totalPrice}</span></Link>
                </span>
            </div>
          </div>

          {/* Logo Of Site  */}
          <div className="header-logo">
              <Link to="/"><img src={Logo} alt="Logo" /></Link>
              <img src={HamBurgerIcon} alt="Logo" className="Hamburgerico" onClick={toggleBox}/>
          </div>

          {/* Links of Header  */}
          <div className="header-links-container navbarHide">
              <div onClick={toggleBox}><Link to="/">HOME</Link></div>
              <span className="dropdown">
                    <a  href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        STORE
                    </a>

                    <ul className="dropdown-menu dropdown-shadow" aria-labelledby="dropdownMenuLink" onClick={toggleBox}>
                        <li className="dropdown-item hoverstop">
                            <div className="dropdown-area-div">
                                <div className="dropdown-list-head">
                                    <span>Accessories</span>
                                    <ul style={{paddingLeft: "0px"}}>
                                        <br />
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">AirPort &#38; Wireless</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Cameras &#38; Video</Link></li>  
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">AppleCare</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Car &#38; Travel</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Bags, Shells &#38; Sleeves</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Business &#38; Security</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Cables &#38; Docks</Link></li>
                                    </ul>
                                </div>
                                <div  className="dropdown-list-head">
                                    <span>Category</span>
                                    <ul style={{paddingLeft: "0px"}}>
                                        <br />
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Charging Devices</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Connected Home</Link></li>  
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Device Care</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Display &#38; Graphic</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Fitness &#38; Sport</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Headphones </Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">HealhKit</Link></li>
                                    </ul>
                                </div>
                                <div  className="dropdown-list-head">
                                    <span>Best Products</span>
                                    <ul style={{paddingLeft: "0px"}}>
                                        <br />
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Mice &#38; Keyboards</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Music Creation</Link></li>  
                                        <li className="dropdown-item hoverstop"><Link to="/products?value=Accesories">Networking &#38; Server</Link></li>
                                    </ul>
                                </div> 
                            </div>
                        </li>
                    </ul>
                </span>
              <div onClick={toggleBox}><Link to="/products?value=Iphone">IPHONE</Link></div>
              <div onClick={toggleBox}><Link to="/products?value=Ipad">IPAD</Link></div>
              <div onClick={toggleBox}><Link to="/products?value=MacBook">MACBOOK</Link></div>
              <div onClick={toggleBox}><Link to="/products?value=Accesories">ACCESORIES</Link></div>
          </div>
        </>
    )
}

export default Header;