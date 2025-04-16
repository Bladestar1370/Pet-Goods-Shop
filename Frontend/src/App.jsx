// App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { MainLayout } from "./layout/MainLayout.jsx";
import Category from "./Components/Category/Category.jsx";
import CategoryProducts from "./Components/Category/CategoryProducts.jsx";
import ProductType from "./Components/ProductType/ProductType.jsx";
import ProductDetails from "./page/Product.jsx";
import { ShopContextProvider } from "../src/Components/CartContext/ShopContext.jsx";
import { LoginSignUp } from "./page/Login/LoginSignup.jsx";
import Cart from "./page/Cart.jsx";
import SearchResults from "./Components/SearchResults/SearchResult.jsx";
import Checkout from './Components/Checkout/Checkout.jsx';
import Confirmation from './Components/Confirmation/Confirmation.jsx'

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:name" element={<CategoryProducts />} />
            <Route path="/product-type/:name" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Route>
        </Routes>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
