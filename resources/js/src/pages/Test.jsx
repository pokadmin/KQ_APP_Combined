import React, { useEffect } from "react";
import {Context} from "../store";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import QuestionAnsAPI from "../services/QuestionAnswerAPI"

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

    useEffect(()=>{
        QuestionAnsAPI.getAll()
        .then((result)=>{
            console.log(result);
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
                height:'100%',
                }}>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    Question Goes here
                </Typography>
                <Divider  variant="middle" />
                <Grid item container p={2} >
                         <ul>
                            <li><Typography varient="body2">Answer1</Typography></li>
                            <li><Typography varient="body2">Answer2</Typography></li>
                            <li><Typography varient="body2">Answer3</Typography></li>
                            <li><Typography varient="body2">Answer4</Typography></li>
                            <li><Typography varient="body2">Answer5</Typography></li>
                        </ul>

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
