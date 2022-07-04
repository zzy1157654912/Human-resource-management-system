import React from 'react'
import {Link} from 'react-router-dom'
import imgUrl from './Just_Can_Run_logo.png'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <img src={imgUrl} style={{width:"70px",height:"70px",marginRight:"15px"}}/>
                    <div>
                        <a href="www.baidu.com" className="navbar-brand">
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
                        <Link to="/login" className="btn btn-primary mb-2">退出登录</Link>
                    </div>
                    
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
