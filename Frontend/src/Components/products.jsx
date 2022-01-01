import React,{useEffect, useState} from "react";
import "./../CSS/products.css";
import "./../CSS/home.css"
import {useLocation, Link } from "react-router-dom";
import Acinfo from "./../JSON/ProductsAccessories.json";
import Brands from "./../JSON/ProductsBrands.json";
import axios from "axios";

function ProductsDetails(){

    const value = useLocation().search;

    const [product, setproduct] = useState([]);
    const [cntBrand, setcntBrand] = useState([4]);

    var [showstart, setshowstart] = useState([0]);
    var [showend, setshowend] = useState([9]);

    const ProductItemShowDisplay1 = () => {
        setshowstart(0)
        setshowend(9);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay2 = () => {
        setshowstart(9)
        setshowend(18);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay3 = () => {
        setshowstart(18)
        setshowend(27);
        window.scroll(0, 200)
    }
    const ProductItemShowDisplay4 = () => {
        setshowstart(27)
        setshowend(36);
        window.scroll(0, 200)
    }

    const qty = value.split("=")[1];

    // const inputcolor = ["blue", "black", "red", "yellow","grey"];

    const BrandInc = () => {
        setcntBrand(Number(cntBrand) + 4);
        document.getElementById("LoadBrand").style.display = "none";
    }

    // const getclickedcolorvalue = () =>{
    //     var getSelectedValue = document.querySelector( 'input[name="inlineRadioOptions"]:checked');   

    //     if(getSelectedValue.value === "blue"){
    //         document.getElementsByClassName("product-banner")[0].style.background= "#2E90E5";
    //         document.getElementsByClassName("product-banner-text")[0].style.color= "#fff";
    //         document.getElementsByClassName("product-banner-link")[0].style.color= "#fff";
    //     }
    //     else if(getSelectedValue.value === "black"){
    //         document.getElementsByClassName("product-banner")[0].style.background= "#171717";
    //         document.getElementsByClassName("product-banner-text")[0].style.color= "#fff";
    //         document.getElementsByClassName("product-banner-link")[0].style.color= "#fff";
    //     }
    //     else if(getSelectedValue.value === "grey"){
    //         document.getElementsByClassName("product-banner")[0].style.background= "#F6F7F8";
    //         document.getElementsByClassName("product-banner-text")[0].style.color= "#000";
    //         document.getElementsByClassName("product-banner-link")[0].style.color= "#000";
    //     }
    //     else if(getSelectedValue.value === "red"){
    //         document.getElementsByClassName("product-banner")[0].style.background= "#FC3E39";
    //         document.getElementsByClassName("product-banner-text")[0].style.color= "#fff";
    //         document.getElementsByClassName("product-banner-link")[0].style.color= "#fff";
    //     }
    //     else if(getSelectedValue.value === "yellow"){
    //         document.getElementsByClassName("product-banner")[0].style.background= "#FFF600";
    //         document.getElementsByClassName("product-banner-text")[0].style.color= "#000";
    //         document.getElementsByClassName("product-banner-link")[0].style.color= "#000";
    //     }

    // }
    

    useEffect(() => {
        window.scroll(0,0);
        const fetchdata = async () =>{
            const {data} = await axios.get("/api/products");
            setproduct(data);
        }
        fetchdata();
  
        return () => {
          //
        }
      }, [])

    var result = [];
    const [renderAcc, setrenderAcc] = useState([]);

    product.map((data) => {
        // console.log(data.category, qty);
        if(data.category === qty){
            // console.log("I got The Same Category")
            result.push(data);
        }
    });


    const AccessoriesRender = () => {
        if(qty === "Accesories"){

            const handleproduct = () => {
                
                var e = document.getElementById("FindProducts");
                var value = e.value;
                      

                if(value === "Airpods"){
                    const updatedItems = result.filter( (item) => {
                        return item.subcategory === "Airpods"
                    })
                    setrenderAcc(updatedItems);
                    // console.log(updatedItems, product)
                }

                else if(value === "Headphone"){
                    const updatedItems = result.filter( (item) => {
                        return item.subcategory === "Headphone"
                    })
                    setrenderAcc(updatedItems)
                    // console.log(updatedItems, product)
                }

                else if(value === "Watch"){
                    const updatedItems = result.filter( (item) => {
                        return item.subcategory === "Watch"
                    })
                    setrenderAcc(updatedItems)
                    // console.log(updatedItems, product)
                }

                else if(value === "More"){
                    const updatedItems = result.filter( (item) => {
                        return item.subcategory === "More"
                    })
                    setrenderAcc(updatedItems)
                    // console.log(updatedItems, product)
                }

                else{
                    const updatedItems = result.filter( (item) => {
                        return item.category === "Accesories"
                    })
                    setrenderAcc(updatedItems)
                    // console.log(updatedItems, product)
                }
            }

            return(
                <>
                   {/* Info about Content  */}
                   <div className="product-info-right-inner-acc">
                        <h3 className="mb-0">Total Items in {qty} Store: {renderAcc.length}</h3>
                        
                        <div>
                            <span>FILTER</span>
                            <select id="FindProducts" onChange={handleproduct}>
                                <option selected>Select </option>
                                <option value="Headphone">HeadPhone</option>
                                <option value="Airpods">Airpods</option>
                                <option value="Watch">Watch</option>
                                <option value="More">Special</option>
                                <option value="All">All</option>
                            </select>
                        </div>
                    </div>

                    {renderAcc.length > 0 ?  <div></div> : setrenderAcc(product)}
                    {/* Content of Products  */}
                    <div className="home-products-details container-fluid">
                    {renderAcc.slice(showstart, showend).map( (item) => {
                    return(
                        <div key={item.id} className="card " id="pc" style={{width: "17.8rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.image} className="card-img-top home-product-image" alt="Products" />
                                    {/* OverLay Property of card  */}
                                    <div className="overlay">
                                        <div className="overlay-img">
                                            <Link to={ "/products/" + item.id }><img src="./Images/Web/favorite_icon.svg" alt="Favorite" className="overlay-img-space" /></Link>
                                            <Link to={"/cart/" + item.id + "?qty=1"}><img src="./Images/Web/add_cart_icon.svg" alt="CartAdd" className="overlay-img-space" /></Link>
                                        </div>
                                    </div>
                             </div>
                             {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
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
                                    <div className="cart-btn-home"><Link to={"/cart/" + item.id + "?qty=1"} ><button className="btn btn-primary">ADD TO CART</button></Link></div>
                            </div>
                        </div>
                        )
                    })}
                    </div> 
                    {/* Making the selection list  */}
                    {/* Making the selection list  */}
                    {
                        renderAcc.length > 12 ? 
                        <div className="product-load-more-container-brand" id="load"> 
                            <span className="dis-btn-brand" onClick={ProductItemShowDisplay1}>1</span> 
                            <span className="dis-btn-brand" onClick={ProductItemShowDisplay2}>2</span> 
                            <span className="dis-btn-brand" onClick={ProductItemShowDisplay3}>3</span> 
                            <span className="dis-btn-brand" onClick={ProductItemShowDisplay4}>4</span> 
                        </div>
                        : 
                        null
                    } 
                </>
            )
        }
        else{
            return(
                <>
                    {/* Info about Content  */}
                    <div className="product-info-right-inner">
                        <h3 className="mb-0">Total Items in {qty} Store: {result.length}</h3>
                    </div>
                    {/* Content of Products  */}
                    <div className="home-products-details container-fluid">
                    {result.slice(0, showend).map( (item) => {
                    return(
                        <div key={item.id} className="card " id="pc" style={{width: "17.8rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.image} className="card-img-top home-product-image" alt="Products" />
                                    {/* OverLay Property of card  */}
                                    <div className="overlay">
                                        <div className="overlay-img">
                                            <Link to={ "/products/" + item.id }><img src="./Images/Web/favorite_icon.svg" alt="Favorite" className="overlay-img-space" /></Link>
                                            <Link to={"/cart/" + item.id + "?qty=1"}><img src="./Images/Web/add_cart_icon.svg" alt="CartAdd" className="overlay-img-space" /></Link>
                                        </div>
                                    </div>
                             </div>
                             {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
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
                                    <div className="cart-btn-home"><Link to={"/cart/" + item.id + "?qty=1"} ><button className="btn btn-primary">ADD TO CART</button></Link></div>
                            </div>
                        </div>
                        )
                    })}
                    </div>

                    {/* Making the selection list  */}
                    <div className="product-load-more-container" id="load"> 
                        {result.length > 12 ? <span className="product-load-more-btn" onClick={ProductItemShowDisplay1}>LOAD MORE</span> : null}
                    </div>
                </>
            )
        }
    }

    return(
        <> 
            
            {/* Product page Heading  */}
            <div className="productsDetailsHeading">
                <p className="productsDetailsinfo">Store / {qty}</p>
            </div>
            {/* Product Page Container  */}
            <div className="d-flex container-fluid mt-5 mb-5" >
                {/* Left Side */}
                <div className="col-md-3 leftHidden">
                    <div className="product-info-left-container">
                        {/* Accessories  */}
                        <div className="product-info-left-inner">
                            <h4 className="mb-3 mt-2">ACCESORIES</h4>
                            {Acinfo.map( (item) => {
                                return(
                                    <Link to={"/productaccessories?value=" + item.product}>
                                        <div className="infodetails" key={item.id}>
                                            <p className="infop">{item.product}</p>
                                            <span style={{color: "#c0c0c0"}}>{item.count}</span>
                                        </div>
                                    </Link>
                                )
                            })} 
                        </div>
                        {/* Color  */}
                        {/* <div className="product-info-left-inner">
                            <h4 className="mb-3 mt-2">COLOR</h4> */}
                            {/* Color Button Click  */}
                            {/* {inputcolor.map( (value, key) => {
                                return(
                                    <div className="form-check form-check-inline" key={key}>
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id={value} value={value} onClick={getclickedcolorvalue}/>
                                        <label className="form-check-label" htmlFor={value}></label>
                                    </div>
                                )
                            })}
                        </div> */}
                        {/* Brands  */}
                        <div className="product-info-left-inner">
                            <h4 className="mb-3 mt-2">BRAND</h4>
                            {Brands.slice(0,cntBrand).map( (item) => {
                                return(
                                    <Link to={"/productdetails?value=" + item.brandname}>
                                        <div className="infodetails" key={item.id}>
                                            <p className="infop">{item.brandname}</p>
                                            <span style={{color: "#c0c0c0"}}>{item.count}</span>  
                                        </div>
                                    </Link>
                                )
                            })} 
                        </div>
                        {/* Load More */}
                        <div className="product-info-left-inner" style={{textAlign: "center", cursor: "pointer"}} onClick={BrandInc} id="LoadBrand">
                            <h5 className="mb-0">MORE</h5>
                        </div>
                    </div>
                </div>

                 {/* ---------------------------------------------- */}

                {/* Right Side  */}
                <div className="col-md-9 RightWidth">
                    {/* Banner */}
                    <div className="product-banner">
                        <div className="product-banner-text">
                            <h1 className="product-banner-header mb-4">iPhone 6 Plus</h1>
                            <p className="product-banner-para mb-4">Performance and design. Taken right to <br />the edge.</p>
                            <Link className="product-banner-link" to="/products?value=Products">SHOP NOW</Link>
                        </div>
                        <img src="./Images/Web/iphone_6_plus.svg" alt="Ihpone" className="Image_banner_product"/>
                    </div>

                    {/* Rendering The Product details  */}
                    <AccessoriesRender />
                </div>
            </div>
        </>
    )
}

export default ProductsDetails;