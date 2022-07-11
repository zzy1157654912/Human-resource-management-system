import axios from "axios";
const Department_BASE_REST_API_URL = "http://localhost:8080/department";

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
class DepartmentService {
    addDepartment(departmentName,id) {
        const options = {
            method:'post',
            Header:{'Content-Type': 'multipart/form-data'},
            data:{
                departmentName,
                id
            },
            url:"http://localhost:3000/department"
        }
        return (axios(options))
    }

    getDepartment() {
        const options = {
            method: 'get',
            url: 'http://localhost:3000/department'
        }
        return (axios(options))
    }

    getDepartmentMember() {
        const options = {
            method: 'get',
            url: 'http://localhost:3000/departmentMember'
        }
        return (axios(options))
    }

    deleteMember(id) {
        const options = {
            method: 'delete',
            url: 'http://localhost:3000/departmentMember/' + id
        }
        return (axios(options))
    }

    addMember(id,memberName,memberIdCardNum,departmentPosition,memberNum) {
        const options = {
            method: 'post',
            data: {
                id,memberName,memberIdCardNum,departmentPosition,memberNum
            },
            url: 'http://localhost:3000/departmentMember'
        }
        return (axios(options))
    }
}

export default new DepartmentService()