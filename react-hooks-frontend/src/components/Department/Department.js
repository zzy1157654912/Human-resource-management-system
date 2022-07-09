import { Button ,Dropdown, Menu,message,Space,Input ,Table,Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import './Department.css'
import LeftSide from "../leftSide/LeftSide";
import { DownOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';
import data from "bootstrap/js/src/dom/data";
import DepartmentService from "../../services/DepartmentService";






const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);



const Department = () => {
    //table栏目
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '身份证号',
            dataIndex: 'IdCard',
        },
        {
            title: '所属部门',
            dataIndex: 'department',
        },
        {
            title: '电话',
            dataIndex: 'phone'
        },
        {
            title: '操作',
            key:'action',
            dataIndex: 'action',
            sorter: true,
            render: (_,record) => (
                <Space size="middle">
                    <a onClick={e => deleteMember(record.key)}>delete</a>
                </Space>
            ),
        }
    ];
    //删除成员操作
    const deleteMember = (key) => {
        //动态更新问题
        data.splice(key,1);

    }

    //table数据
    // const [data,setData] = useState([]);

    let data = [];
    for (let i = 0; i < 16; i++) {
        data.push({
            key: i,
            name: `章子烨${i}`,
            IdCard: 123456789123456789,
            department: `London, Park Lane no. ${i}`,
            phone:12332112345,
            action:"删除"
        });
    }




    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [selectData,setSelectData] = useState(data);

    const onSearch = (value) => {
        if (!value) {
            setSelectData(data)
        } else {
            let newData = [];
            newData = data.filter(item => {
                return item.name == value
            });
            setSelectData(newData)
            console.log(newData)
        }
    };

    const start = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleMenuClick = (e) => {
        message.info('更换部门成功');
        const key = e.key;
        switch (key) {
            case "1": setDepartment('技术部');
                break;
            case "2": setDepartment('设计部');
                break;
            case "3": setDepartment('产品经理组');
        }
    };
    const handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };
    const [menuItem,setMenuItem] = useState([]);
    //获得部门列表
    const getDepartmentList = () => {
        DepartmentService.getDepartment().then((response) => {
            console.log(response.data)
        })
    }
    useEffect(() => {

        getDepartmentList();


    }, [])
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={menuItem}
        />
    );

    const [department,setDepartment] = useState("技术部");

    //弹出框函数组
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //输入框内容绑定
    const [inputValue,setInputValue] = useState("");
    const inputChange = (e) => {
        setInputValue(e);
    }
    const onConfirm = (e) => {
        e.preventDefault();
        const key = 1;
        DepartmentService.addDepartment(inputValue,key).then((res) => {
            console.log(res)
            handleCancel()
        })
            .catch(err => {
                console.log(err)
            })
        // const newObj = {
        //     label: inputValue,
        //     key: String(Number(menuItem[menuItem.length - 1].key) + 1),
        //     icon: <UserOutlined />,
        // }
        // let addDepartment = new Promise((resolve, reject) => {
        //     //判断接口是否正常
        //     if (true) resolve()
        //     else reject()
        // })
        // addDepartment.then(() => {
        //     let newItem = menuItem;
        //     newItem.push(newObj)
        //     setMenuItem(newItem)
        //     console.log(menuItem)
        //     handleCancel()
        // })
    }
    return (
        <div className="department-contain">
            <LeftSide />
            <div className="department-content">
                <div className="head">
                    <Button type="primary" size={"large"} style={{marginRight:"1.5vw"}} >+ 新建成员</Button>
                    <Button type="primary" size={"large"} onClick={showModal}>+ 新建部门</Button>
                    <Dropdown overlay={menu} >
                        <Button size={"large"} style={{marginLeft:"30vw"}}>
                            <Space>
                                {department}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                        <Search
                            placeholder="输入姓名搜索成员"
                            onSearch={onSearch}
                            style={{
                                width: 200,
                                marginLeft:"2vw"
                            }}
                            size={"large"}
                        />
                </div>
                <div
                    style={{
                        marginBottom: 16,
                        width:"90%"
                    }}
                >
                    <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={selectData} pagination={{pageSize:7}} style={{width:"95%",marginLeft:"2.5%"}}/>
            </div>
            <Modal
                visible={visible}
                title="新增部门"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        确认添加
                    </Button>,
                ]}
            >
                <div className="input">
                    <p>部门名称</p>
                    <Input
                        onChange={(e) => inputChange(e.target.value)}
                        onPressEnter = {onConfirm}
                    />
                    <p>所属部门</p>
                    <Dropdown overlay={menu}>
                        <Button>
                            <Space>
                                {department}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
            </Modal>
        </div>
    )
}

export default Department