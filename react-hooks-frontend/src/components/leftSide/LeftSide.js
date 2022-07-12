import './leftSide.css';
import {isLogin} from "../../global";
import {Avatar} from "antd";
import imgURL from './zzy.JPG';
import React,{ useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Menu } from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('管理模块', '1', <PieChartOutlined />),
    getItem('代办事项', '2', <DesktopOutlined />),
    getItem('已完成业务', '3', <ContainerOutlined />),
    getItem('企业邮箱', 'sub1', <MailOutlined />),
    getItem('更多', 'sub2', <AppstoreOutlined />, [
        getItem('计划', '9'),
        getItem('娱乐', '10'),
    ]),
];

const LeftSide = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    //选中管理
    const [check,setCheck] = useState([])
    //路由管理
    const Redirect = useNavigate();
    //点击跳转
    const onClick = (e) => {
        const key = e.key;
        switch (key) {
            case '1': Redirect('/department');
            setCheck(["1"])
            break;
            case '2': Redirect('/calendar');
                setCheck(["2"])
            break;
            case '3': console.log(3);
                setCheck(["3"])
            break;
            case 'sub1': window.location.href = "https://email.163.com/";
            break;
        }
    };
    return (
         isLogin() == true && <div className="left-contain" style={{width:"20vw"}}>
            <div className="user-img">
                <Avatar src={imgURL} size={160} shape={"square"}></Avatar>
            </div>
            <div className="user-name">章子烨</div>
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
                selectedKeys={check}
            />
        </div>


    )
}

export default LeftSide