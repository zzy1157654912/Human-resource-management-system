import { Button ,Dropdown, Menu,message,Space,Input ,Table} from 'antd';
import React, {useState} from 'react';
import './Department.css'
import LeftSide from "../leftSide/LeftSide";
import { DownOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';

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
        render: () => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    }
];

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
    //table数据
    const data = [];
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
    const [loading, setLoading] = useState(false);
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
        message.info('Click on menu item.');
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

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: '技术部',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '设计部',
                    key: '2',
                    icon: <UserOutlined />,
                },
                {
                    label: '产品经理组',
                    key: '3',
                    icon: <UserOutlined />,
                },
            ]}
        />
    );

    const [department,setDepartment] = useState("技术部");


    return (
        <div className="department-contain">
            <LeftSide />
            <div className="department-content">
                <div className="head">
                    <Button type="primary" size={"large"} style={{marginRight:"1.5vw"}}>+ 新建成员</Button>
                    <Button type="primary" size={"large"} >+ 新建部门</Button>
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
        </div>
    )
}

export default Department