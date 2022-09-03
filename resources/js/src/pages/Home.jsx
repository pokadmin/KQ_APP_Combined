import React,{useEffect,useState} from "react";
import {Context} from "../store";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import { grey } from "@mui/material/colors";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Switch,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
//import guruSeeker from '../images/guru_seeker.jpg';
import Login from "../components/Login";

function Home(){
    const [state,dispatch]=useContext(Context);
    const { t, i18n } = useTranslation(); // for language translation
    const [checked, setChecked] = React.useState(false); // for language selection
    const [langDialog,setLangDialog]=React.useState(true); // for displaying langauge selection dialog
    const navigate=useNavigate(); // for manual routing


    const handleChange = (event) => {
      setChecked(event.target.checked);
      if(event.target.checked){
        i18n.changeLanguage("hi");
        dispatch({type:'setLanguage',payload:{language:'hi'}}); // store the changed language globally

      }else{
        i18n.changeLanguage("en");
        dispatch({type:'setLanguage',payload:{language:'en'}}); // store the changed language globally
      }
    };

    const handleDialogClose=(event,reason)=>{
      if(reason && reason == "backdropClick")
      return;
      setLangDialog(false); // close the dialog
    }


    // Login handling

    const [loginDialog,setLoginDialog]=React.useState(false); // for displaying langauge selection dialog

    const [values, setValues] = React.useState({
        email:'',
        password: '',
        showPassword: false,
    });

    const handleCredChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
    setValues({
        ...values,
        showPassword: !values.showPassword,
    });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleAuthenticated=()=>{
        console.log('Authenticated');
    }

    // when component re-renders, check the preset language and set the switch accordingly
    useEffect(()=>{
        if(state.user.language=='hi'){
            setChecked(true);
        }
    });

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
                    {t('Knowledge Quotient- Rules and Information')}
                </Typography>
                <Divider  variant="middle" />
                <Grid item container p={2} >
                    <Grid item xs={12}>
                        <ul>
                            <li><Typography varient="body2">{t('Rule1')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule2')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule3')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule4')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule5')}</Typography></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography paragraph varient="body2">{t('GeneralInfo')}</Typography>
                    </Grid>






                </Grid>

            </CardContent>
            <CardActions sx={{ justifyContent:"center", alignItems:"center"}}>
                <Button variant="outlined" color="secondary" onClick={()=>{navigate('/test')}} endIcon={<SendIcon />}>{t('Start Quiz')}</Button>

            </CardActions>

        </Card>

        {/* Language selection dialoge */}
        <Dialog
            open={langDialog}
            disableEscapeKeyDown
            onClose={handleDialogClose}

            sx={{
                textAlign: "center"
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor:grey[900],
                    color:"whitesmoke"
                }}
            >
            <Typography variant="h5">Language Selection / भाषा चयन</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={3}>
                <Grid item xs={12} sx={{alignItems:"center"}}>
                <Typography varient="body1">Please select your language</Typography>
                <Typography varient="body1" gutterBottom>कृपया अपनी भाषा चुनें</Typography>

                    <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    mt={2}
                    sx={{
                        border:"1px solid grey",
                        borderRadius:2
                    }}
                    >
                        <Typography variant="button">English</Typography>
                        <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="secondary"
                        />
                        <Typography variant="button" color="secondary">हिन्दी</Typography>
                    </Stack>
                </Grid>
                </Grid>
            </DialogContent>
            <DialogActions >
                <Button onClick={handleDialogClose}>{t("OK")}</Button>
            </DialogActions>
        </Dialog>

        <Login
            authenticated={handleAuthenticated}
        >
        </Login>

       </Grid>


  );
}

export default Home;
