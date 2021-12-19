import React,{ Component } from "react";
import axios from "axios";

const api=axios.create({
    baseURL:'http://127.0.0.1:8000/'
});

class ApiCalls extends Component{

    constructor(){
        super();
       /* axios.get('sanctum/csrf-cookie').then(response => {
            api.post('api/login',{email:'pandurang@abc.com',password:1234}).then(res=>{
                console.log(res);
            });
        }); */

        api.get('api/questionAnswer').then(res=>{
            console.log(res);
        });

       /* api.delete('api/questionAnswer/4').then(res=>{
            console.log(res);
        }); */
    }

    render(){
        return(
            <div>Api calls</div>
        );
    }
}

export default ApiCalls
