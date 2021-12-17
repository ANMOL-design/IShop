import React from "react";
import "./../CSS/header.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import profileImg from "./Images/Web/profile_icon.svg";
import bagImg from "./Images/Web/bag_icon.svg";
import Logo from "./Images/Web/iSHOP_Logo.svg";
import { useSelector} from "react-redux";

function Header(){

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    return(
        <>
          {/* Top part Of header  */}
          <div className="heading-top-container">
            {/* Division 1 for en and $  */}
            <div className="header-profile-container">
                <span className="dropdown">
                    <a className="dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        EN
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li className="dropdown-item">en-US</li>
                        <li className="dropdown-item">IN</li>
                        <li className="dropdown-item">SZ</li>
                    </ul>
                </span>
                <span className="dropdown">
                    <a className="dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                         &#36;
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li className="dropdown-item">&#36;</li>
                        <li className="dropdown-item">&#x20B9;</li>
                        <li className="dropdown-item">&#163;</li>
                    </ul>
                </span>
            </div>
            {/* Division 2 for My Profile  */}
            <div className="header-profile-container">
                <span>
                    <img src={profileImg} alt="Profile" />&nbsp;
                    <Link to="/profile">My Profile</Link>
                </span>

                <span>
                    <img src={bagImg} alt="Profile" />&nbsp;{cartItems.length} item <span style={{color: "#c0c0c0", paddingLeft: "0px"}}>$998</span>
                </span>
                <i className="fa fa-search"></i>
            </div>
          </div>

          {/* Logo Of Site  */}
          <div className="header-logo">
              <img src={Logo} alt="Logo" />
          </div>

          {/* Links of Header  */}
          <div className="header-links-container ">
              <div><Link to="/">HOME</Link></div>
              <span className="dropdown">
                    <a  href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        STORE
                    </a>

                    <ul className="dropdown-menu dropdown-shadow" aria-labelledby="dropdownMenuLink">
                        <li className="dropdown-item hoverstop">
                            <div className="dropdown-area-div">
                                <div className="dropdown-list-head">
                                    <span>Accessories</span>
                                    <ul style={{paddingLeft: "0px"}}>
                                        <br />
                                        <li className="dropdown-item hoverstop"><Link to="/products">AirPort &#38; Wireless</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Cameras &#38; Video</Link></li>  
                                        <li className="dropdown-item hoverstop"><Link to="/products">AppleCare</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Car &#38; Travel</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Bags, Shells &#38; Sleeves</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Business &#38; Security</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Cables &#38; Docks</Link></li>
                                    </ul>
                                </div>
                                <div  className="dropdown-list-head">
                                    <span>Category</span>
                                    <ul style={{paddingLeft: "0px"}}>
                                        <br />
                                        <li className="dropdown-item hoverstop"><Link to="/products">Charging Devices</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Connected Home</Link></li>  
                                        <li className="dropdown-item hoverstop"><Link to="/products">Device Care</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Display &#38; Graphic</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Fitness &#38; Sport</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Headphones </Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">HealhKit</Link></li>
                                    </ul>
                                </div>
                                <div  className="dropdown-list-head">
                                    <span>Best Products</span>
                                    <ul style={{paddingLeft: "0px"}}>
                                        <br />
                                        <li className="dropdown-item hoverstop"><Link to="/products">Mice &#38; Keyboards</Link></li>
                                        <li className="dropdown-item hoverstop"><Link to="/products">Music Creation</Link></li>  
                                        <li className="dropdown-item hoverstop"><Link to="/products">Networking &#38; Server</Link></li>
                                    </ul>
                                </div> 
                            </div>
                        </li>
                    </ul>
                </span>
              <div><Link to="/products?value=Iphone">IPHONE</Link></div>
              <div><Link to="/products?value=Ipad">IPAD</Link></div>
              <div><Link to="/products?value=MacBook">MACBOOK</Link></div>
              <div><Link to="/products?value=Accesories">ACCESORIES</Link></div>
          </div>
        </>
    )
}

export default Header;