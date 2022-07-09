import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import imgUrl from './Just_Can_Run_logo.png'
import {isLogin} from '../global'
import {Button,Input, Space} from "antd";
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;

const HeaderComponent = () => {
    const navigate = useNavigate();
    const logOut = () =>  {
        localStorage.clear();
        console.log(localStorage)
        navigate('/login')
    };
    const state = {}
    const searchItem = ['产品管理','权限管理','员工管理','客户管理'];
    const Redirct = useNavigate();
    const onSearch = (value) => {
        if (searchItem.indexOf(value) !== -1) {
            switch (value) {
                case '产品管理': Redirct('/products');
                break;
                case '权限管理': Redirct('/roots');
                break;
                case '员工管理': Redirct('/employees');
                break;
                case '客户管理': Redirct('/customers');
            }
        } else {

        }
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <img src={imgUrl} style={{width:"70px",height:"70px",marginRight:"15px"}}/>
                    <div>
                        <a className="navbar-brand" >
                            Just Can Run 人力资源管理系统
                        </a>
                        
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/department" className="btn btn-primary mb-2">权限管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/customers" className="btn btn-primary mb-2">客户管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/employees" className="btn btn-primary mb-2">员工管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/roots" className="btn btn-primary mb-2">权限管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        { isLogin() == true &&
                        <Button to="/"
                              className="btn btn-primary mb-2"
                                size={"large"}
                                onClick={(e)=>logOut(e)}
                        >
                            退出登录
                        </Button>
                        }
                    </div>
                    <div style={{position:"absolute",right:"5vw"}}>
                        <Search
                            placeholder="搜索你需要的内容"
                            onSearch={onSearch}
                            status={state}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                    
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
