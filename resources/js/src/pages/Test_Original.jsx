import React, { useEffect, useRef } from "react";
import {Context} from "../store";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import QuestionAnsAPI from "../services/QuestionAnswerAPI"


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import { grey } from "@mui/material/colors";
import {
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Divider,
  Box,
  FormHelperText,
  Link
} from "@mui/material";
import { result } from "lodash";





function Test(){
    const [state,dispatch]=useContext(Context); //Gloabl state
    const { t, i18n } = useTranslation(); // for Language translation
    const navigate=useNavigate(); // for manual routing



    const [questionSet,setQuestionSet]=React.useState([{ // will hold the set of questions along with resof the meta data received from API
        question:'',
        answers:{
            correct_answer0:'',
            wrong_answer1:'',
            wrong_answer2:'',
            wrong_answer3:'',
            wrong_answer4:'',
            wrong_answer5:''
        },
        explanation:'',
        attributes:{
            pokp_link:'',
            bodhitube_podbean_link:''
        }
    }]);

    const [shuffeledAnswers,setShuffeledAnswers]=React.useState(['','','','','','','']); // holds shuffled answers
    const [currentQuestionNumber,setCurrentQuestionNumber]=React.useState(0); // keeps track of qhich question is being displayed from questionSet (0-5)
    const [questionSequenceNumber,setQuestionSequenceNumber]=React.useState(1); // keeps track of total number of qyestions answered
    const [selectedAnswer, setSelectedAnswer] = React.useState(false); // index of the crrent selected answer
    const [correctAnswer, setCorrectAnswer] = React.useState(false); // index of the correct of current question answer

    var tempStorage={}; // will hold all the current states of the question after answered.

    // button /style states
    const [submitted,setSubmitted]=React.useState(false); // boolean - true when answer submit is clicked
    const [answerSelected,setAnswerSelected]=React.useState(false); // boolean - true when any of the answer option is selected
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose an answer');
    const answersHandle=React.useRef(null);



    const handleChange = (event) => {
        let answerIndex=parseInt(event.target.value)
        setSelectedAnswer(answerIndex);
        setAnswerSelected(true); // set the state so that buttons are enabled.
       /*  if(answerIndex==correctAnswer){
          alert("Correct");
        } */
    };

    // initial fetch of the question sets
    useEffect(()=>{
      getFreshQuestionSet();
      setCurrentQuestionNumber(0);
    },[]); // for getting questions from server



    useEffect(()=>{
      shuffleAnswers();
    },[questionSet,currentQuestionNumber]) // shuffle the answers for next question



    const getFreshQuestionSet=()=>{

        QuestionAnsAPI.getQuestionAnswers(state.user.language)
        .then((result)=>{
            console.log(result);

            setQuestionSet(result.data.data);
            console.log('globalState',state.answeredQuestions);
        })
        .catch(err=>{alert(err)});
    }

    /**
     * ShuffleAnswers
     *
     * Takes all the answers of current question from the questionset data
     * shuffles them and updates the state "shuffledAnswers"
     * identifies correct answer for current question and updates the state "correctAnswer" - it's an index - position of the correct answer in above mentioned shuffled array
     */
    const shuffleAnswers=()=>{
        const answers=questionSet[currentQuestionNumber].answers;
        const shuffeledAnswersObj=shuffleObject(answers);

        const answerKeys=Object.keys(shuffeledAnswersObj);
        console.log('answerKeys=',answerKeys);

        const correctAnswer=answerKeys.indexOf('correct_answer0');
        console.log('correctAnswer=',correctAnswer);
        setCorrectAnswer(correctAnswer);
        const answerValues=Object.values(shuffeledAnswersObj);
        setShuffeledAnswers(answerValues);


       // return shuffeledAnswerElements;

    }

    function shuffleObject(obj){
        // new obj to return
      let newObj = {};
        // create keys array
      var keys = Object.keys(obj);
        // randomize keys array
        keys.sort(function(a,b){return Math.random()- 0.5;});
      // save in new array
        keys.forEach(function(k) {
            newObj[k] = obj[k];
    });
      return newObj;
    }

    const handleSubmit=()=>{
        setSubmitted(true); // change the state so that "Next" button is displayed
        tempStorage={
            question:questionSet[currentQuestionNumber].question,
            answers:shuffeledAnswers, // array
            selectedAnswer:selectedAnswer, // index
            correctAnswer:correctAnswer, // index
            isCorrect:(selectedAnswer==correctAnswer)?true:false
        }

        // set error/correct text
        if(tempStorage.isCorrect){
            setError(false);
            setHelperText('Correct Answer');
        }else{
            setError(true);
            setHelperText('Sorry, wrong answer!');
        }

          // store the answered question and details in global state - maintains history
          dispatch({type:'addAnsweredQuestions',payload:tempStorage});

          answersHandle.current.children[correctAnswer].style.border="3px solid green";
          answersHandle.current.children[correctAnswer].style.boxShadow="3px 4px 10px";

    }

    const handleNext=()=>{

        // re-set everything
        setError(false);
        answersHandle.current.children[correctAnswer].style.border="";
        answersHandle.current.children[correctAnswer].style.boxShadow="";

        setHelperText('Choose an answer');
        setQuestionSequenceNumber(questionSequenceNumber+1);// always increments
        if(currentQuestionNumber>=4){ // then we need to make call to server for more questions
          getFreshQuestionSet();
          setCurrentQuestionNumber(0);
        }else{
          setCurrentQuestionNumber(currentQuestionNumber+1);
        }
        setSelectedAnswer(false);
        setSubmitted(false);
        setAnswerSelected(false);


    }

    const handleEnd=()=>{
        navigate('/result');
    }



  return(
    <Grid container
        alignItems="center"
        justifyContent="center"
        p={2}
    >


            <Card sx={{
                maxWidth:{
                    xs:"100%",
                    sm:"100%",
                    md:"80%"
                },
                minWidth:{
                    xs:"100%",
                    sm:"100%",
                    md:"80%"
                },
                height:'100%',
                }}>
            <CardContent
                sx={{
                    maxHeight:'75vh',
                    overflow:'auto'
                }}
            >
                <Typography gutterBottom variant="h6">
                  {t("Q")}.{questionSequenceNumber} {questionSet[currentQuestionNumber].question}
                </Typography>
                <Divider  variant="middle" />
                <Grid item container p={2} >

                    <FormControl error={error}>
                        <FormLabel id="controlled-radio-buttons-group">Answers</FormLabel>
                        <RadioGroup
                            aria-labelledby="controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={selectedAnswer}
                            onChange={handleChange}
                            ref={answersHandle}
                        >
                            <FormControlLabel key={"answer"+0}  value={0} control={<Radio color="secondary" />} label={shuffeledAnswers[0]} />
                            <FormControlLabel key={"answer"+1}  value={1} control={<Radio color="secondary" />} label={shuffeledAnswers[1]} />
                            <FormControlLabel key={"answer"+2} value={2} control={<Radio color="secondary" />} label={shuffeledAnswers[2]} />
                            <FormControlLabel key={"answer"+3} value={3} control={<Radio color="secondary" />} label={shuffeledAnswers[3]} />
                            <FormControlLabel key={"answer"+4} value={4} control={<Radio color="secondary" />} label={shuffeledAnswers[4]} />
                            <FormControlLabel key={"answer"+5} value={5} control={<Radio color="secondary" />} label={shuffeledAnswers[5]} />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                { submitted&&<Divider  variant="middle" /> }
                {
                    submitted&&
                    <Grid item container p={2} >
                       <FormControl error={error}>
                         <FormHelperText> <Typography variant="overline">{t(helperText)} </Typography></FormHelperText>
                          <Typography variant="body2">
                              {questionSet[currentQuestionNumber].explanation}
                          </Typography>
                         {/*  <Box mt={2}>
                            <Link href={questionSet[currentQuestionNumber].attributes.pokp_link}><IconButton  color="secondary"><OndemandVideoIcon /><Typography variant="caption">{t('Video Link')}</Typography> </IconButton></Link>
                          </Box> */}
                        </FormControl>
                    </Grid>
                }

            </CardContent>
            <CardActions sx={{ justifyContent:"center", alignItems:"center"}}>
                {!submitted&&<Button disabled={!answerSelected} variant="outlined" color="secondary" onClick={handleSubmit} >{t('Submit')}</Button>}
                {submitted&&<Button disabled={!answerSelected} variant="outlined" color="secondary" onClick={handleNext} >{t('Next')}</Button>}
                <Button variant="outlined" color="error" onClick={handleEnd} >{t('End')}</Button>
            </CardActions>

        </Card>


    </Grid>


  );
}

export default Test;
