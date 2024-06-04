import { LoginDataType, SignUpDataType } from '@/types/AuthInput';
import axios from 'axios';
const url = process.env.CLIENT_SOURCE_URL as string
const md5 = require("blueimp-md5");

interface loginReqParameter extends LoginDataType {
    salt: string
    challenge: string
}

const signInUsers = async (userDetails: loginReqParameter) => {
    console.log(userDetails);

    const { salt, challenge, email, password } = userDetails
    
    const hashPass = md5(`${password} ${salt}`)
    console.log(hashPass);

    const lastHashPass = md5(`${challenge} ${hashPass}`)
    console.log(lastHashPass);
    
    const userData = { email, password: lastHashPass, challenge }
    console.log(userData);

    try {
        const request = await axios.post(`http://localhost:5000/api/authhash`, userData)
        console.log(request.data);
        const { email, name } = request.data
        localStorage.setItem("LoginRequestInfo", JSON.stringify({ email, name }))
        return {success:true}

    } catch (e) {
        console.log(e);
        
        return { success: false }
    }
}

export default signInUsers