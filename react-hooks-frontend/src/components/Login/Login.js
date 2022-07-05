import React,{ useState,useEffect } from "react";
import ReactDom from 'react-dom';
import LoginCss from "./login.css"
import "../../global"
import { Button, Checkbox, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import {setToken} from "../../global";
import {isLogin} from "../../global";



const Login = () => {
    const [userName,setUserName] = useState("");
    const [userPassword,setUserPw] = useState("");
    const [verificationCode,setCode] = useState("");

    const onFinish = (values) => {
        console.log('Success:', values);
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const navigate = useNavigate();
    const register = () => {
        navigate('/register')
    }

    const log_in = (e) => {
        e.preventDefault();
        const data = {userName,userPassword,verificationCode};
        console.log(data);
        setToken("sdfsdfsdafds");
        if (isLogin()) {

            navigate('/customers')
        } else {
            navigate('/')
        }
    }



    return (
        <div className="login-container">
            <div className="login-contain">
                <div className="login-img"></div>
                <div className="login-input">
                    <div className="logo"></div>
                    <div className="title" >人力资源管理系统</div>
                    <Form
                        className="form-label"
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空!',
                                },
                            ]}
                        >
                            <Input
                                value = {userName}
                                onChange = {e =>setUserName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空!',
                                },
                            ]}
                        >
                            <Input.Password
                                size={"small"}
                                value = {userPassword}
                                onChange = {e =>setUserPw(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login"
                                size={"large"}
                                onClick={(e)=>log_in(e)}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    <button className="register" onClick={(e) => register()}>注册</button>
                </div>
            </div>

        </div>



    )
}

export default Login