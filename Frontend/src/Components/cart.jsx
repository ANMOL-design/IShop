import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams, useLocation, useNavigate } from "react-router-dom";
import {addToCart,  removeFromCart } from "./Actions/CartAction";
import "./../CSS/cart.css";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function MyCart(){

    const cart = useSelector(state => state.cart);

    const navigate = useNavigate();

    const {cartItems} = cart;

    // console.log(cartItems)
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch("/aboutuser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
    
            const data = await res.json();
                
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

            console.log(data);
            setUserData(data);
        } 
        catch (err) {
            console.log(err);
            navigate("/login", { replace: true })
        }
    };
    
    useEffect(() => {
        callAboutPage();
    }, []);

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


   
    var totalPrice = cartItems.reduce( (a, c) => a + c.price * c.qty, 0 + 20);
 
    const removeFromCartHandler = (productId) =>{
        dispatchEvent(removeFromCart(productId));
    }

    const navigatetoproduct = (id) => {
        navigate("/products/" + id);
    }

	async function displayRazorpay() {

		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Check your Internet Connection.')
			return
		}

		const data = await fetch('/razorpay',{ 
            method: 'POST',
            headers: {
                "content-Type" : "application/json",
            },
            body: JSON.stringify({
                totalPrice,
            })
    }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: 'rzp_test_119cJvO3u59nKY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: userData.name,
			description: 'IShop Payment Gateway',
			handler: function (response) {
				alert(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_order_id)
				alert("Transaction Successful.\nThanks for buying product from iShop.\n Your Order wil delivered within a week");

                 // destroy the cookies
                localStorage.removeItem("cartItems");
                navigate("/");
                window.location.reload();
			},
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open();
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
                           cartItems.map((item) => {
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
                    <div className="mb-3 inputvoutcher">
                        <input type="text"  placeholder="Voucher code" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-primary" type="button" id="button-addon2">Redeem</button>
                    </div>
                    {/* Right Add Cart  */}
                    <div className="mb-3 col-md-4">
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
                            
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="checkout mt-3">
                            <button onClick={displayRazorpay} className="btn btn-primary btn-block" disabled={cartItems.length === 0}>Check out</button>
                        </div>
                    </div>
              </div>
          </div>
        </>
    )
}

export default MyCart;
