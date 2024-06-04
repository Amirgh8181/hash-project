
const getSignUpUsers = async () => {
    try {
        const req = await fetch("http://localhost:5000/api/userhash")
            .then(res => res.json()); 
            console.log(req);
                       
        return req;
    }
    catch (e) {
        console.log('some thing went wrong !')
    }
};

export default getSignUpUsers;