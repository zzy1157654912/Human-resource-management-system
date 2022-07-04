import React from "react";
import LoginCss from "./login.css"
import "../../global"
import { withRouter,Redirect } from "react-router-dom";
import {setToken} from "../../global";
import {isLogin} from "../../global";


const log_in = (e) => {
    e.preventDefault();
    setToken("sdfsdfsdafds");
    if (isLogin()) {
        this.props.history.push('./login')
    }
}

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-contain">
                <div className="login-img"></div>
                <div className="login-input">
                    <div className="logo"></div>
                    <div className="title" >人力资源管理系统</div>
                    <input type="text" placeholder="请输入账号"/>
                    <input type="password" placeholder="请输入密码" style={{marginTop:"20px"}}/>
                    <div className="forget">忘记密码?</div>
                    <input type="text" placeholder="请输入验证码" style={{width:"40%",left:"35%",marginTop:"22px"}}/>
                    <div className="code-img"></div>
                    <button className="login" onClick={(e) => log_in(e)}>登录</button>
                    <button className="register">注册</button>
                </div>
            </div>
        </div>
    )
}

export default Login