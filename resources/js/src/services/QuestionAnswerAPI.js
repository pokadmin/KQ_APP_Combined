import axios from "axios";


const BASE_URL="http://127.0.0.1:8000/";
const commonHeaders={
    // put all the common hdears here
};

const api=axios.create({
    baseURL:BASE_URL
});

const getAll= async(params)=>{
    return await api.get('api/questionAnswer');
}

const getHindiQuestionAnswers=async(params)=>{
    // 1. create header as required by API server
    // 2. make the call

    return await api.post('http://127.0.0.1:8000/api/questionAnswerSet',{language:'Hindi'});
}

const getEnglishQuestionAnswers=async(params)=>{
     // 1. create header as required by API server
    // 2. make the call
}

const QuestionAnswerAPI={
    getAll,
    getHindiQuestionAnswers,
    getEnglishQuestionAnswers
};

export default QuestionAnswerAPI;
