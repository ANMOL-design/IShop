import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { cartReducer } from "./Reducer/cartReducer";
import { productDetailsReducer } from "./Reducer/productReducer";
import Cookie from "js-cookie";

const cartItems = JSON.parse(Cookie.get('cartItems')) || [];

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;