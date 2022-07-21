/**
 * Displays result fo the test
 * Similar desgin theme is maintained as that of test
 * displayes score - correct answers/total answered
 */

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "../store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    Divider
  } from "@mui/material";

function Result(){

    const [state,dispatch]=useContext(Context); //Gloabl state
    const navigate=useNavigate();
    const { t, i18n } = useTranslation(); // for Language translation
    const[totalAnswered,setTotalAnswered]=useState(0);
    const[totalCorrectAnswered,setTotalCorrectAnswered]=useState(0);


    useEffect(()=>{

        var temp1=0,temp2=0;
        state.answeredQuestions.forEach(answer => {
          temp1++;
          if(answer.isCorrect==true){
            temp2++;
          }
        });

        setTotalAnswered(temp1);
        setTotalCorrectAnswered(temp2);
    },[]);

    const handleReTake=(event)=>{
        navigate('/test');
    };

    const handleQuitApp=(event)=>{
        window.close();
    };

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
                  {t("Results")}
                </Typography>
                <Divider  variant="middle" />
                <Grid item container p={2} direction="column">

                    <Typography gutterBottom  variant="h5"  display="block"
                         sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                            fontSize: 20,
                            color:'info.main'
                        }}

                    >
                            {t("Well Done, Here are your results")}
                    </Typography>

                    <Typography
                     gutterBottom  variant="h5"  display="block"
                        sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                            fontSize: 40,
                            color:'info.main'
                        }}
                    >
                        {t("You have scored ")+ totalCorrectAnswered +"/"+ totalAnswered}
                    </Typography>

                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent:"center", alignItems:"center"}}>
                <Button variant="outlined" color="secondary" onClick={handleReTake} >{t('Re-Take')}</Button>
                <Button variant="outlined" color="error" onClick={handleQuitApp} >{t('Quit App')}</Button>
            </CardActions>

        </Card>


    </Grid>



    );
}

export default Result;
