import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams, useNavigate } from "react-router-dom";
import { detailsProduct } from "./Actions/ProductAction";
import "./../CSS/productdetails.css";


function ProductsEachItem(){
    const description = "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
    const {id} = useParams();
    const navigate = useNavigate();
  
    // const result = data.find( x => x.id === id );  old code to find specific product
    // create a hook to get the value of product quantity
    const [qty, setqty] = useState(1);
    
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsProduct(id));
        window.scroll(0, 100);
        
    }, [dispatch])

    // Code to redirect user to cart page on click to add cart
    const handleAddToCart = () => {
        navigate("/cart/" + id + "?qty=" + qty);
    }
    return(
        <>
            {loading ? <div className={"loaderpage"}>Loading...</div> : error ? <div>{error}</div> : (
            <div className="details" key={product.id}>
                {/* Show the Image  */}
                <div className="details-image col-md-4">
                    <img src={"./../" + product.image} alt="Product" />
                </div>
                {/* show the content  */}
                <div className="details-info col-md-8">
                    <ul>
                        <li>
                            <h3><span style={{color: "#FF1E56"}}>Product : </span> {product.name}</h3>
                        </li>
                        <li>
                            <h5><span style={{color: "#FF1E56"}}>Product ID : </span> {product.id}</h5>
                        </li>
                        <li>
                            <h6><span style={{color: "#FF1E56"}}>Price : </span>${product.NewPrice} &nbsp;&nbsp;<span style={{color: "#c0c0c0", textDecoration: "line-through"}}>(${product.OldPrice})</span></h6>
                        </li>
                        <li>
                            <h6><span style={{color: "#FF1E56"}}>You Save : </span>${product.OldPrice - product.NewPrice}</h6>
                        </li>
                        <li>
                            <h6><span style={{color: "#FF1E56"}}>Discount : </span>{Math.round(100*(product.OldPrice - product.NewPrice)/product.OldPrice)}%</h6>
                        </li>
                        
                        <li>
                            <h6><span style={{color: "#FF1E56"}}>Description: </span>{description}</h6>
                        </li>
                    </ul>

                </div>
                <div className="details-action">
                <ul>
                    <li>
                        <h2><span style={{color: "#FF1E56"}}>Order Now : </span>  {product.name}</h2>
                    </li>
                    <li>
                        <h5><span style={{color: "#FF1E56"}}>Price : </span> ${product.NewPrice}</h5> 
                    </li>
                    <li>
                        <h5><span style={{color: "#FF1E56"}}>Status : </span>{product.qntInStock > 0 ? "Available In Stock" : "Out Of Stock"}</h5>
                    </li>
                    <li>
                        <h5><span style={{color: "#FF1E56"}}>Qty :</span></h5> <select value={qty} onChange={ (e) => {setqty(e.target.value) }}>
                            {/* Making a dyanimic approch to product quantity  */}
                            {[...Array(product.qntInStock).keys()].map( x => {
                                return(
                                    <option value={x+1}>{x+1}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className="btnli">
                        {product.qntInStock > 0 && <button onClick={handleAddToCart} className="btn btn-warning">Add to Cart</button>}
                    </li>
                </ul>
            </div>
            </div>
            )}

        </>
    )
   
}

export default ProductsEachItem;