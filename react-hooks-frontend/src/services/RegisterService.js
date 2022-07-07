import axios from "axios";
const REGISTER_BASE_REST_API_URL = "http://localhost:8080/register";

class RegisterService {
    register(mes) {
        const {adminIdCardNum, adminUsername, adminPassword, adminEmail} = {...mes};
        const data = {
            adminIdCardNum,
            adminUsername,
            adminPassword,
            adminEmail
        };
        console.log(data)
        const options = {
            method:'post',
            Header:{'Content-Type': 'multipart/form-data'},
            data: {
                adminIdCardNum,
                adminUsername,
                adminPassword,
                adminEmail
            },
            url:"http://localhost:8080/register"
        }
        return (axios(options))
    }
}

export default new RegisterService()