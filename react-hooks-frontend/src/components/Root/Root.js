import './Root.css';
import LeftSide from "../leftSide/LeftSide";
import { SearchOutlined } from '@ant-design/icons';
import React , { useState,useRef }from "react";
import { Space, Table, Tag, Checkbox, Divider, Row, Col,Button, Input,Switch } from 'antd';
import Highlighter from 'react-highlight-words';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['部门权限', '人员权限'];
const defaultCheckedList = ['人员权限'];


const Root = () => {
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

    const onChangeRoot = (checked) => {
        console.log(`switch to ${checked}`);
    };

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
            ...getColumnSearchProps('name'),
            // render: (text) => <a>{text}</a>,
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            ...getColumnSearchProps('position'),
        },
        {
            title: '所处部门',
            dataIndex: 'department',
            key: 'department',
            ...getColumnSearchProps('department'),
        },
        {
            title: '权限',
            key: 'root',
            dataIndex: 'root',
            render:(_, { root , key }) => (
                <div>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={onChange}
                        defaultValue={root}
                    >
                        <Row>
                            <Col span={8}>
                                <Checkbox value="部门权限" disabled={true}>部门权限</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="人员权限" disabled={true}>人员权限</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            )
        },
        {
            title: '账号封禁',
            key: 'action',
            render: (_, record) => (
                <Switch defaultChecked onChange={onChangeRoot} disabled={true} />
            ),
        },
    ];

    const [checkedList, setCheckedList] = useState([]);
    // const [indeterminate, setIndeterminate] = useState(true);
    // const [checkAll, setCheckAll] = useState(false);
    const allCheck = () => {
        return true
    }
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const data = [
        {
            key: '1',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '2',
            name: 'Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '3',
            name: 'JohnBrown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['部门权限']
        },
        {
            key: '4',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '5',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '6',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '7',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '8',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },

        {
            key: '9',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '10',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
        {
            key: '11',
            name: 'John Brown',
            position: '技术专家',
            department: '技术部',
            tags: ['nice'],
            root: ['人员权限','部门权限']
        },
    ];
    return (
        <div className="root-contain" style={{display:"flex"}}>
            <LeftSide />
            <div className="member-list-contain" style={{width:"92vw"}}>
                <div className="member-list">
                    <Table columns={columns} dataSource={data} pagination={{pageSize:9}}/>
                </div>
            </div>
        </div>
    )
}

export default Root;