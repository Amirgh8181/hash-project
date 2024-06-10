import { SignUpDataType } from '@/types/AuthInput'
import axios from 'axios';

interface signUpReqParameter extends SignUpDataType {
  salt: string
}


const md5 = require("blueimp-md5");

const signUpUser = async (userDetails: signUpReqParameter) => {
  console.log(userDetails);
  const hashPass = md5(`${userDetails.password} ${userDetails.salt}`)
  console.log(hashPass);
  userDetails.password = hashPass;
  console.log(userDetails);

  try {
    const request = await axios.post(`http://localhost:5000/api/userhash`, userDetails)
    console.log(request.data.userHash);
    return ({ success: true, email: request.data.userHash.email });
  } catch (e) {
    return { success: false, email: "" }
  }
}

export default signUpUser