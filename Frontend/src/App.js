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
import Register from "./Components/Register";
import Login from "./Components/Login";
import AboutUser from "./Components/UserProfile";
import Logout from "./Components/Logout";
import ProductsDetailsBrand from "./Components/SubComponent/ProductsDetailsBrand";
import ProductsDetailsAccessories from "./Components/SubComponent/ProductAccessories";


function App(){
    return(
        <>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/products" element={ <ProductsDetails />} />
                  <Route path="/productdetails" element={ <ProductsDetailsBrand />} />
                  <Route path="/productaccessories" element={ <ProductsDetailsAccessories />} />
                  <Route path="/register" element={ <Register />} />
                  <Route path="/login" element={ <Login />} />
                  <Route path="/products/:id" element={ <ProductsEachItem />} />
                  <Route path="/cart/:id" element={ <MyCart />} />
                  <Route path="/cart" element={ <MyCart />} />
                  <Route path="/profile" element={ <AboutUser />} />
                  <Route path="/logout" element={ <Logout />} />
                  <Route path="/" element={ <Home />} />
              </Routes>
              <Footer />
          </BrowserRouter>
        </>
    )
}

export default App;