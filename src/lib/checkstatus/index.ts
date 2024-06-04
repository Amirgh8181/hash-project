import axios from 'axios';
const url = process.env.BACKEND_SOURCE_URL as string


const checkUserStatus = async (userEmail: { email: string }) => {
    console.log(userEmail);
    try {
        const {data} = await axios.post(`http://localhost:5000/api/hash`, userEmail)
        console.log(data);
        return {success:true,...data};

    } catch (e) {
        return {success:false}
    }
}

export default checkUserStatus