import axios from "axios";


const BASE_URL=process.env.MIX_APP_URL; //"http://127.0.0.1:8000/";
const commonHeaders={
    // put all the common hdears here
};

const api=axios.create({
    baseURL:BASE_URL
});

const attempLogin= async(email,pass)=>{

    return await api.post('api/login',{email:email,password:pass});
}

/* const register= async(name,email,pass,passConfirmation,language)=>{

    return await api.post('api/register',{name,email:email,password:pass,password_confirmation:passConfirmation,language:language});
}
 */


const AuthenticationAPI={
    attempLogin,
   /*  register */
};

export default AuthenticationAPI;
