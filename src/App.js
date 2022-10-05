import logo from './logo.svg';
import Register from './Register';
import Login from './Login'
import Dashboard from './Dashboard';
import Profile from './Profile'
import Cart from './Cart'
import Product from './Product'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import AdminRegister from './AdminRegister'
import AdminAddProduct from './AdminAddProduct'
import AdminManage from './AdminManage'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard/:username/:email" element={<Dashboard />} />
          <Route exact path="/cart/:username/:email/:cData" element={<Cart />} />
          <Route exact path="/profile/:username/:email" element={<Profile />} />
          <Route exact path="/product/:username/:email/:id" element={<Product />} />
          <Route exact path="/adminLogin" element={<AdminLogin />} />
          <Route exact path="/adminpanel/:username/:email" element={<AdminPanel />} />
          <Route exact path="/adminregister/:username/:email" element={<AdminRegister />} />
          <Route exact path="/addproduct/:username/:email" element={<AdminAddProduct />} />
          <Route exact path="/adminmanage/:username/:email" element={<AdminManage />} />
          
        </Routes>
      </Router>
  );
}

export default App;
