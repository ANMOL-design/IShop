import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../../CSS/home.css";


function HomeProducts(){

    const [product, setproduct] = useState([]);
    const [cntProduct, setcntProduct] = useState([8]);

    const IncrementProductsCards = () =>{
        setcntProduct(Number(cntProduct) + 4);
    }

    if(cntProduct >= 16){
        document.getElementById("load").style.display = "none";
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
            <h1>BEST SELLER</h1>
            <div className="home_products_links">
                <ul>
                    <li><Link to="/products?value=Products">All</Link></li>
                    <li><Link to="/products?value=Mac">Mac</Link></li>  
                    <li><Link to="/products?value=Iphone">iPhone</Link></li>
                    <li><Link to="/products?value=Ipad">iPad</Link></li>
                    <li><Link to="/products?value=Ipod">iPod</Link></li>
                    <li><Link to="/products?value=Accessories">Accessories</Link></li>
                </ul>
            </div>
          </div>
          {/* Details of Product  */}
          <div className="home-products-details container-fluid">
                {product.slice(0,cntProduct).map( (item) => {
                    return(
                        <div key={item.id} className="card " id="pc" style={{width: "18rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.image} className="card-img-top home-product-image" alt="Products" />
                                    {/* Hot Icon On Card  */}
                                    <div className="Hotproducts">
                                        HOT
                                    </div>
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

          <div className="product-load-more-container" id="load"> 
              <span onClick={IncrementProductsCards} className="product-load-more-btn">LOAD MORE</span>
          </div>
        </>
    )
}

export default HomeProducts;