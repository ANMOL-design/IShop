import React,{useEffect, useState} from "react";
import "./../CSS/home.css";
import { Link } from "react-router-dom";
import HomeProducts from "./SubComponent/HomeItems";
import Data from "./../JSON/ProductPolicy.json";
import HomeFeatures from "./SubComponent/HomeNewProducts";


function Home(){


    const [DataLoading, setDataLoading] = useState(false);


    useEffect(() => {
        window.scroll(0,0);
        setDataLoading(true);
    }, []);

    if (!DataLoading){
        return (
            <div className="loader">Loading...</div>
        );
    }

    return(
        <>
          {/* Banner 1  */}
          <div className="home-banner">
            <img src="./Images/Web/iphone_6_plus.svg" alt="Ihpone" className="Image_banner_home"/>
          </div>
          {/* Products Details  */}
          <HomeProducts />
          {/* Banner 2 */}
          <div className="home-banner-2">
               <div className="home-banner-text">
                 <h1 className="banner-header-2">iPhone 6 Plus</h1>
                 <p className="banner-para-2">Performance and design. Taken right to <br />the edge.</p>
                 <Link className="banner-link-2" to="/products?value=Products">SHOP NOW</Link>
               </div>
              <img src="./Images/Web/iphone_6_plus.svg" alt="Ihpone" className="Image_banner_home"/>
          </div>
          {/* policies Shown  */}
          <div className="home-products-policies-container">
            {Data.map( (item) => {
              return(
                <div className="products-shipping" key={item.id}>
                    <img src={item.image} alt="Shopping" />
                    <h3 className="products-shipping-heading">{item.heading}</h3>
                    <p className="products-shipping-para">{item.paragraph}</p>
                </div>
              )
            })}
          </div>
          {/* Features Product  */}
          <HomeFeatures />
        </>
    )
}

export default Home;