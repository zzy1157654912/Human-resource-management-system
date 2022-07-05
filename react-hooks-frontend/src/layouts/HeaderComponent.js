import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import imgUrl from './Just_Can_Run_logo.png'
import {isLogin} from '../global'
import {Button} from "antd";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const logOut = () =>  {
        localStorage.clear();
        console.log(localStorage)
        navigate('/login')
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
                        <Link to="/products" className="btn btn-primary mb-2">产品管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/customers" className="btn btn-primary mb-2">客户管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/employees" className="btn btn-primary mb-2">员工管理</Link>
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
                    
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
