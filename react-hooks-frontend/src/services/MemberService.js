import axios from "axios";

class MemberService {
    getAllMember() {
        const options = {
            method:'get',
            url: 'http://localhost:3000/member'
        }
        return(axios(options))
    }

    addMember(id,name,IdCard,position,department) {
        const options = {
            method: 'post',
            // Header:{'Content-Type': 'multipart/form-data'},
            data: {
                id,name,IdCard,position,department
            },
            url: 'http://localhost:3000/member'
        }
        return(axios(options))
    }

    deleteMember(id) {
        const options = {
            method: 'delete',
            url: 'http://localhost:3000/member/' + id
        }
        return(axios(options))
    }
}

export default new MemberService()