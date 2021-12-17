import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams, useLocation, useNavigate } from "react-router-dom";
import {addToCart,  removeFromCart } from "./Actions/CartAction";
import "./../CSS/cart.css";

function MyCart(){

    const cart = useSelector(state => state.cart);

    const navigate = useNavigate();

    const {cartItems} = cart;

    const {id} = useParams();
    const value = useLocation().search;
    const qty = value.split("=")[1];

    const dispatchEvent = useDispatch()

    useEffect(() => {
        if(id){
            dispatchEvent(addToCart(id, qty))
        }
        window.scroll(0,0);
        return () => {
            //
        }
    }, [dispatchEvent]); // eslint-disable-line react-hooks/exhaustive-deps
   
    const removeFromCartHandler = (productId) =>{
        dispatchEvent(removeFromCart(productId));
    }

    const navigatetoproduct = (id) => {
        navigate("/products/" + id);
    }

    const checkoutHandler = () =>{
        navigate("/signin?redirect=shipping");
    }

    return(
        <>
          <div className="cart mb-5">
              <div className="cartheading">
                  Cart
              </div>
              <div className="cart-list container-fluid">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>PRODUCT</th>
                                <th></th>
                                <th>PRICE</th>
                                <th>QTY</th>
                                <th>UNIT PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                           cartItems.length === 0 ? <div className="noitems">Cart Is Empty</div> 
                           :
                           cartItems.map((item, key) => {
                               return(
                                   <>
                                   <tr key={item.id}>
                                        <td onClick={() => removeFromCartHandler(item.product)}><div className="cutitem">x</div></td>
                                        <td><img src={"./../" + item.image} alt="CartProduct" /></td>
                                        <td  onClick={() => navigatetoproduct(item.product)} className="cartproduct">{item.name}</td>
                                        <td>$ {item.price * item.qty}</td>
                                        <td><select value={item.qty} onChange={ (e) => dispatchEvent(addToCart(item.product, e.target.value))}>
                                                {[...Array(item.qntInStock).keys()].map( x => {
                                                    return(
                                                        <option value={x+1}>{x+1}</option>
                                                    )
                                                })}
                                           </select>
                                        </td>
                                        <td>${item.price}</td>
                                    </tr>
                                   </>
                               )
                               })}
                        </tbody>
                    </table>
              </div>
              <div className="cart-action">
                    {/* left Coupon  */}
                    <div class="mb-3 inputvoutcher">
                        <input type="text"  placeholder="Voucher code" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button class="btn btn-primary" type="button" id="button-addon2">Redeem</button>
                    </div>
                    {/* Right Add Cart  */}
                    <div class="mb-3 col-md-4">
                        <div className="checkout marginsmall">
                            <p>SubTotal </p>
                            <span>${cartItems.reduce( (a, c) => a + c.price * c.qty , 0)}</span> 
                        </div>
                        <div className="checkout">
                            <p>Shipping fee</p>
                            <span>$20</span> 
                        </div>
                        <div className="checkout">
                            <p>Coupon</p>
                            <span>No</span> 
                        </div>
                        <hr />
                        <div className="checkout">
                            <h3>TOTAL </h3>
                            <h3>${cartItems.reduce( (a, c) => a + c.price * c.qty, 0) + 20}</h3>
                        </div>
                        <div className="checkout mt-3">
                            <button onClick={checkoutHandler} className="btn btn-primary btn-block" disabled={cartItems.length === 0}>Check out</button>
                        </div>
                    </div>
              </div>
          </div>
        </>
    )
}

export default MyCart;
