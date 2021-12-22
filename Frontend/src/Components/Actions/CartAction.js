import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/constants";

const addToCart = (productId, qty) => async(dispatch, getState) => {

    try {
        // Making call to the server for cart
        const { data } = await axios.get("/api/products/" + productId);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data.id,
                name: data.name,
                image: data.image,
                price: data.NewPrice,
                qntInStock: data.qntInStock,
                qty
            }
        });
        const { cart: { cartItems } } = getState();
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {}
}

const removeFromCart = (productId) => async(dispatch, getState) => {

    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const { cart: { cartItems } } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


export { addToCart, removeFromCart };