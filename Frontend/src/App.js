import React from "react";
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import Header from "./Components/header";
import Home from "./Components/home";
import "./CSS/index.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./Components/footer";
import ProductsDetails from "./Components/products";
import ProductsEachItem from "./Components/ProductDetails";
import MyCart from "./Components/cart";

function App(){
    return(
        <>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/products" element={ <ProductsDetails />} />
                  <Route path="/products/:id" element={ <ProductsEachItem />} />
                  <Route path="/cart/:id" element={ <MyCart />} />
                  <Route path="/" element={ <Home />} />
              </Routes>
              <Footer />
          </BrowserRouter>
        </>
    )
}

export default App;