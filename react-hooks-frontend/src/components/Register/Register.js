import '../Login/login.css'
import './register.css'
import RegisterService from "../../services/RegisterService";
import React, {useState,useEffect} from "react";
import {Button, Checkbox, Form, Input,Result} from "antd";
import {useNavigate} from "react-router-dom";
const Register = () => {
    const [adminUsername,setUserName] = useState("");
    const [adminPassword,setUserPw] = useState("");
    const [adminIdCardNum,setUserID] = useState("");
    const [adminEmail,setUserEmail] = useState("");
    const [userPhone,setUserPhone] = useState("");
    const [result,setResult] = useState(false);
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values,result);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //注册
    const userRegister = (e) => {
        e.preventDefault();
        const data = {adminIdCardNum,adminUsername,adminPassword,adminEmail};
        let mes = {adminIdCardNum,adminUsername,adminPassword,adminEmail}
        RegisterService.register(mes).then((res) => {
            console.log(res);
            setResult(true);
        })
            .catch((err) => {
                console.log(err)
            })
        console.log(mes,result);
    }

    //前往登录页面
    const goToLogin = () => {
        navigate('/login')

    }

    return ( result == false ?
        <div className="login-container">
            <div className="login-contain">
                <div className="login-img"></div>
                <div className="register-form">
                    <div className="logo" style={{left:"7vw",top:"5.5vh"}}></div>
                    <h3 style={{position:"absolute",top:"8vh",left:"12vw",fontWeight:"700"}}>注册信息</h3>
                    <Form
                        className="form-label"
                        name="basic"
                        style={{top:"20vh"}}
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
                                value = {adminUsername}
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
                            <Input
                                size={"small"}
                                value = {adminPassword}
                                onChange = {e =>setUserPw(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="身份证号"
                            name="userID"
                            rules={[
                                {
                                    required: true,
                                    message: '身份证不能为空!',
                                },
                            ]}
                        >
                            <Input
                                size={"small"}
                                value = {adminIdCardNum}
                                onChange = {e =>setUserID(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="邮箱"
                            name="userEmail"
                            rules={[
                                {
                                    required: true,
                                    message: '邮箱不能为空!',
                                },
                            ]}
                        >
                            <Input
                                size={"small"}
                                value = {adminEmail}
                                onChange = {e =>setUserEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="手机号码"
                            name="userPhone"
                            rules={[
                                {
                                    required: true,
                                    message: '手机号码不能为空!',
                                },
                            ]}
                        >
                            <Input
                                size={"small"}
                                value = {userPhone}
                                onChange = {e =>setUserPhone(e.target.value)}
                            />
                        </Form.Item>



                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <div style={{display:"flex",marginTop:"2vh"}}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login"
                                    size={"large"}
                                    onClick={userRegister}
                                >
                                    注册
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login"
                                    size={"large"}
                                    style={{width:"40%",marginLeft:"3vw",textAlign:"center"}}
                                    onClick={(e) => goToLogin()}
                                >
                                    前往登录
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
            :
            <div className="register-success">
                <Result
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button type="primary" key="console" onClick={(e) => goToLogin()}>
                            前往登录页面
                        </Button>
                    ]}
                />
            </div>

    )
}

export default Register