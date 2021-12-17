import React from "react";
import "./../CSS/footer.css";
import fb from "./Images/Web/facebook.svg";
import tw from "./Images/Web/twitter.svg";
import bank1 from "./Images/Web/Western_union.svg";
import bank2 from "./Images/Web/master_card.svg";
import bank3 from "./Images/Web/Paypal.svg";
import bank4 from "./Images/Web/visa.svg";
import flogo from "./Images/Web/iSHOP_Logo.svg";

function Footer(){

    const FooterName = ["Infomation", "Service", "Extras", "My Account", "Userful Links", "Our Offers"];
    return(
        <>
           <div className="footer-container">
               {/* Upper Footer */}
               <div className="footer-upper-container">
                   <div className="footer-upper-inner">
                        <img src={flogo} alt="FooterLogo" className="footer-upper-image"/>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
                   </div>
                   <div className="footer-upper-inner">
                       <h3>Follow Us</h3>
                       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                       <img src={fb} alt="FB" className="footer-upper-image" />
                       <img src={tw} alt="Twitter" className="footer-upper-image"/>
                   </div>
                   <div className="footer-upper-inner">
                       <h3>Contact Us</h3>
                       <p>iShop: address @building 124 Call us now: 0123-456-789 Email: support@whatever.com</p>
                   </div>
               </div>
               {/* Center Part of Footer  */}
               <div className="footer-center-container">
                   {FooterName.map( (item, key) => {
                       return(
                        <div className="footer-center-items" key={key}>
                            <div>
                            <h5>{item}</h5>
                            <p>About Us   </p>
                            <p>Infomation</p>
                            <p>Privacy Policy</p>
                            <p>Terms &amp; Conditions</p>
                            </div>
                        </div>
                       )
                   })}
               </div>
           </div>
           <div className="footer-bank-container">
               <img src={bank1} alt="Bank" />
               <img src={bank2} alt="Bank" />
               <img src={bank3} alt="Bank" />
               <img src={bank4} alt="Bank" />
           </div>
        </>
    )
}

export default Footer;