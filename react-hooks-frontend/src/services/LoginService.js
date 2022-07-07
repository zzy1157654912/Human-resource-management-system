import axios from "axios";
const LOGIN_BASE_REST_API_URL = "http://localhost:8080/login";


axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
class LoginService {
    login(username,password) {
        const options = {
            method:'post',
            Header:{'Content-Type': 'multipart/form-data'},
            params: {
                username:username,
                password:password
            },
            url:"http://localhost:8080/login"
        }
        return (axios(options))
    }
}

export default new LoginService();