import React, {useEffect, useState} from "react";
import axios from "axios";
import "./../../CSS/home.css";
import { useNavigate } from "react-router-dom";

function HomeFeatures(){

    const [product, setproduct] = useState([]);
    const navigate = useNavigate();

    const HandleClick = () =>{
        navigate("/products?value=Featured");
    }

    useEffect(() => {
        const fetchdata = async () =>{
            const {data} = await axios.get("http://localhost:5000/api/products");
            setproduct(data);
        }
        fetchdata();

        return () => {
            //
        }
    }, [])

    return(
        <>
          <div className="home_products_sell">
            <h1 style={{letterSpacing: '0.75px',color: '#22262A', margin: "2rem"}}>FEATURED PRODUCTS</h1>
          </div>
          
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{marginBottom: "5rem"}}>
            <div className="carousel-inner">
                {/* Feature Product Feature 1  */}
                <div className="carousel-item active">   
                    <div className="home-features-details" onClick={HandleClick}>
                        {product.slice(9,12).map( (item) => {
                        return(
                        <div key={item.id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.image} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.name}</h5>
                                {/* Stars in Body  */}
                                <div className="product-space">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                    <span className="product-actual-price">${item.NewPrice}</span>
                                    <span className="product-old-price">${item.OldPrice}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
                {/* Feature Product Feature   */}
                <div className="carousel-item">   
                    <div className="home-features-details" onClick={HandleClick}>
                        {product.slice(4,7).map( (item) => {
                        return(
                        <div key={item.id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.image} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.name}</h5>
                                {/* Stars in Body  */}
                                <div className="product-space">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                    <span className="product-actual-price">${item.NewPrice}</span>
                                    <span className="product-old-price">${item.OldPrice}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
                {/* Feature Product Feature 3  */}
                <div className="carousel-item">   
                    <div className="home-features-details" onClick={HandleClick}>
                        {product.slice(13,16).map( (item) => {
                        return(
                        <div key={item.id} className="card " id="fc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.image} className="card-img-top" alt="Products" />
                            </div>
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                <h5 className="card-title" style={{fontSize: '1.1rem'}}>{item.name}</h5>
                                {/* Stars in Body  */}
                                <div className="product-space">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                                {/* Product Price in Body  */}
                                <div className="product-space">
                                    <span className="product-actual-price">${item.NewPrice}</span>
                                    <span className="product-old-price">${item.OldPrice}</span> 
                                </div>
                            </div>                                                       
                        </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true">&#60;</span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true">&#62;</span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    )
}

export default HomeFeatures;
