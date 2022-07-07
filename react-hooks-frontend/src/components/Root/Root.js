import './Root.css';
import LeftSide from "../leftSide/LeftSide";
import React , { useState }from "react";
import { Space, Table, Tag, Checkbox, Divider, Row, Col } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['部门权限', '人员权限'];
const defaultCheckedList = ['人员权限'];

const Root = () => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '所处部门',
            dataIndex: 'department',
            key: 'department',
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
                                <Checkbox value="部门权限">部门权限</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="人员权限">人员权限</Checkbox>
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
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
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
    ];
    return (
        <div className="root-contain" style={{display:"flex"}}>
            <LeftSide />
            <div className="member-list-contain">
                <div className="member-list">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    )
}

export default Root;