import React,{useState,useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Routes,useNavigate} from 'react-router-dom'
import FooterComponent from './layouts/FooterComponent'
import HeaderComponent from './layouts/HeaderComponent'
import ListEmployeeComponent from './components/Employee/ListEmployeeComponent'
import ListProductComponent from './components/Product/ListProductComponent'
import ListCustomerComponent from './components/Customer/ListCustomerComponent'
import Login from "./components/Login/Login"
import Register from './components/Register/Register'
import Root from './components/Root/Root'
import {isLogin} from "./global";
import LeftSide from "./components/leftSide/LeftSide";


export default function App() {
    //封装一个重定向函数
    function Redirect({ to }) {
        let navigate = useNavigate();
        useEffect(() => {
            navigate(to);
        });
        return null;
    }
        return (
            <Router>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
                        <Route path="/products" element={<ListProductComponent/>}></Route>
                        <Route path="/customers" element={<ListCustomerComponent/>}></Route>
                        <Route path="/roots" element={<Root/>}></Route>
                        //路由重定向
                        <Route
                            path="/"
                            element={<Redirect to="/login" />}
                        />
                    </Routes>

            </Router>
    )

} 
