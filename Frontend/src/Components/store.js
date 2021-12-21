import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { cartReducer } from "./Reducer/cartReducer";
import { LoginLogoutDetailsReducer } from "./Reducer/LoginReducer";
import { productDetailsReducer } from "./Reducer/productReducer";

const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
    productDetails: productDetailsReducer,
    cart: cartReducer,
    isLoggedIn: LoginLogoutDetailsReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;