//https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf

import React,{createContext,useReducer} from "react";



// initialize the initial state of the user
const initialState={
    user:{
        language:'en',
        type:'guest',
        score:0,
        email:'',
        username:''
    },
    answeredQuestions:[]


}


const Reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case 'setLanguage':
            return {
                ...state,
                user:{
                    ...state.user,
                    language:payload.language,
                }
            }

        case 'authentication':
            return{
                ...state,
                showLogin:payload.showLogin??false,
                isAuthenticated:payload.isAuthenticated??false,
                authentictaedUser:payload.authentictaedUser??null,
            }

        case 'changeUserType':
            return {
                ...state,
                user:{
                    ...user,
                    type:payload.type??'guest',
                    email:payload.email??'',
                    username:payload.username??'guest'
                }
            }

         case 'resetUser':
             return initialState

         case 'addAnsweredQuestions':
             return {
                 ...state,
                 answeredQuestions:[
                     ...state.answeredQuestions,
                     payload
                 ]
             }

        default:
            return state

    }
}

const Store=({children})=>{
    const [state,dispatch]=useReducer(Reducer,initialState);
    return(
        <Context.Provider value={[state,dispatch]}>
            {children}
        </Context.Provider>
    );
}

export const Context = React.createContext();

export default Store;
