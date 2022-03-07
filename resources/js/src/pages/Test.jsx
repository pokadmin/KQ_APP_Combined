import React, { useEffect } from "react";
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

import { grey } from "@mui/material/colors";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Divider,
  Box
} from "@mui/material";
import { result } from "lodash";





function Test(){
    const [state,dispatch]=useContext(Context); //Gloabl state
    const { t, i18n } = useTranslation(); // for Language translation
    const navigate=useNavigate(); // for manual routing

    const [answer, setAnswer] = React.useState(false);
    const [questionSet,setquestionSet]=React.useState([]);
    const currentQuestion=0; // keeps track of qhich question is being displayed from questionSet

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };

    useEffect(()=>{
        QuestionAnsAPI.getHindiQuestionAnswers()
        .then((result)=>{
            console.log(result);
            setquestionSet(result.data.data);
        })
        .catch(err=>{alert(err)});
    },[])



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
                    Question Goes here
                </Typography>
                <Divider  variant="middle" />
                <Grid item container p={2} >

                    <FormControl>
                        <FormLabel id="controlled-radio-buttons-group">Answers</FormLabel>
                        <RadioGroup
                            aria-labelledby="controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={answer}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="answer1" control={<Radio color="secondary" />} label="Answer1 Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit
                            Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit
                            Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit" />
                            <FormControlLabel value="answer2" control={<Radio color="secondary" />} label="Answer2 Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit" />
                            <FormControlLabel value="answer3" control={<Radio color="secondary" />} label="Answer3 Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit
                            Rule1- Lorem ipsum dolor sit am" />
                            <FormControlLabel value="answer4" control={<Radio color="secondary" />} label="Answer4 Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit
                            Rule1- Lorem ipsum dolor sit am" />
                            <FormControlLabel value="answer5" control={<Radio color="secondary" />} label="Answer4 Rule1- Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quos blanditiis tenetur unde suscipit
                            Rule1- Lorem ipsum dolor sit am" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

            </CardContent>
            <CardActions sx={{ justifyContent:"center", alignItems:"center"}}>
                <Button variant="outlined" color="secondary" >{t('Prev')}</Button>
                <Button variant="outlined" color="secondary" >{t('Next')}</Button>

            </CardActions>

        </Card>


    </Grid>


  );
}

export default Test;
