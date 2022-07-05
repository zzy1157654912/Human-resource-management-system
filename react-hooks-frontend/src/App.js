import React,{useState,useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Routes,Navigate} from 'react-router-dom'
import FooterComponent from './layouts/FooterComponent'
import HeaderComponent from './layouts/HeaderComponent'
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent'
import ListProductComponent from './components/Product/ListProductComponent'
import ListCustomerComponent from './components/Customer/ListCustomerComponent'
import Login from "./components/Login/Login"
import Register from './components/Register/Register'
import {isLogin} from "./global";




export default function App() {
        return ( isLogin()?
            <div>
                <Router>
                    <HeaderComponent />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<ListProductComponent/>}></Route>
                            <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
                            <Route path="/products" element={<ListProductComponent/>}></Route>
                            <Route path="/customers" element={<ListCustomerComponent/>}></Route>
                            <Route path="/login" element={<Login/>}></Route>
                        </Routes>
                    </div>
                    <FooterComponent />
                </Router>
            </div> :  <Router>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/" element={<ListProductComponent/>}></Route>
                        <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
                        <Route path="/products" element={<ListProductComponent/>}></Route>
                        <Route path="/customers" element={<ListCustomerComponent/>}></Route>
                    </Routes>
                </Router>
        )

} 
