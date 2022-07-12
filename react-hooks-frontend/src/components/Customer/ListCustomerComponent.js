import React,{useState,useEffect,useRef} from 'react'
import MemberService from "../../services/MemberService";
import AddCustomerComponent from './AddCustomerComponent'
import UpdateCustomerComponent from './UpdateCustomerComponent'
import LeftSide from "../leftSide/LeftSide";
import ExcelPort from "../ExcelPort/ExcelPort";
import { Button , Input, Space, Table,  Modal} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const ListCustomerComponent = () => {

    //table data
    const [data,setData] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    // define customers state and get a methed to update customers
    const [customers, setCustomers] = useState([])

    const [showAddCustomer,setShowAddCustomer] = useState(false);
    const [showUpdateCustomer,setShowUpdateCustomer] = useState(false);
    let [activeId,setActiveId] = useState(null);


    // get customer data from backend
    const getMember = () => {
        MemberService.getAllMember().then((res) => {
            console.log(res.data)
            setData(res.data)
        })
    }

    useEffect(() => {
       
        getMember();
        

    }, [])

    //add Member
    const [memberName,setMemberName] = useState("");
    const [memberIdCard,setMemberIdCard] = useState("");
    const [memberPosition,setMemberPosition] = useState("");
    const [memberDep,setMemberDep] = useState("");
    const addMember = () => {
        let key = data[data.length - 1].id;
        MemberService.addMember(key+=1,memberName,memberIdCard,memberPosition,memberDep).then((res) => {
            getMember();//回调获取成员列表
        })
    }

    //delete Member
    const deleteMember = (e) => {
        MemberService.deleteMember(e).then((res) => {
            getMember();//回调拉取成员列表
        })
    }


    //table函数组
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            ...getColumnSearchProps('name'),
        },
        {
            title: '身份证号',
            dataIndex: 'IdCard',
            key: 'IdCard',
            width: '30%',
            ...getColumnSearchProps('age'),
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '操作',
            key:'action',
            dataIndex: 'action',
            sorter: true,
            render: (_,record) => (
                <Space size="middle">
                    <a onClick={e => deleteMember(record.id)}>移除</a>
                </Space>
            ),
        }
    ];


    //modal函数组
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        addMember();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 100);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const setName = (e) => {
        setMemberName(e)
    }
    const setIdCard = (e) => {
        setMemberIdCard(e)
    }
    const setPosition = (e) => {
        setMemberPosition(e)
    }
    const setDep = (e) => {
        setMemberDep(e)
    }



    return (
        <div style={{ width:"113vw"}}>
            <div className="container" style={{position:"relative"}}>
                <div style={{display:"flex",marginTop:"2vw",marginLeft:"2vw"}}>
                    <Button type="primary" size={"large"} onClick={showModal}>添加成员</Button>
                    <ExcelPort />
                </div>
                <div style={{width:"79vw",marginLeft:"2vw",marginTop:"2vw"}}>
                    <Table columns={columns} dataSource={data} pagination={{pageSize:7}}/>
                </div>
            </div>
            <Modal
                visible={visible}
                title="添加成员"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        确定
                    </Button>,
                ]}
            >
                <p>姓名</p>
                <Input placeholder="请输入姓名" onChange={(e) => setName(e.target.value)}/>
                <p>身份证号</p>
                <Input placeholder="请输入身份证号码" onChange={(e) => setIdCard(e.target.value)}/>
                <p>职位</p>
                <Input placeholder="请输入职位" onChange={(e) => setPosition(e.target.value)}/>
                <p>所属部门</p>
                <Input placeholder="请输入所属部门" onChange={(e) => setDep(e.target.value)} onPressEnter={handleOk}/>
            </Modal>
        </div>


    )
}

export default ListCustomerComponent;
