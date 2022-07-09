import axios from "axios";
const Department_BASE_REST_API_URL = "http://localhost:8080/department";

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
class DepartmentService {
    addDepartment(departmentName,secondarySegments) {
        const options = {
            method:'post',
            Header:{'Content-Type': 'multipart/form-data'},
            data:{
                departmentName,
                secondarySegments
            },
            url:Department_BASE_REST_API_URL
        }
        return (axios(options))
    }

    getDepartment() {
        const options = {
            method: 'get',
            url: Department_BASE_REST_API_URL
        }
        return (axios(options))
    }
}

export default new DepartmentService()