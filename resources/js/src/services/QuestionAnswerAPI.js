import axios from "axios";


const BASE_URL=process.env.MIX_APP_URL; //"http://127.0.0.1:8000/";
const commonHeaders={
    // put all the common hdears here
};

const api=axios.create({
    baseURL:BASE_URL,
    //headers: {'X-CSRF-TOKEN': document.getElementsByName("csrf-token")[0].content}
});

const getAll= async(params)=>{
    return await api.get('api/questionAnswer');
}

const getQuestionAnswers=async(params)=>{
    // 1. create header as required by API server
    // 2. make the call
    if(params=='en'){
        var language="English";
    }else{
        var language="Hindi";
    }

    return await api.post(BASE_URL+'api/questionAnswerSet',{language:language});
}


const QuestionAnswerAPI={
    getAll,
    getQuestionAnswers,
};

export default QuestionAnswerAPI;
