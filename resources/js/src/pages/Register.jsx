/**
 * Displays UI for Admin user Registration
 * Similar desgin theme is maintained as that of test
 *
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
     Divider,
     Stack,
     OutlinedInput,
     InputLabel,
     FormControl,
     InputAdornment,
     IconButton,
     TextField,
     Box
   } from "@mui/material";

    import Visibility  from "@mui/icons-material/Visibility";
    import VisibilityOff  from "@mui/icons-material/VisibilityOff";
    import AccountCircle  from "@mui/icons-material/AccountCircle";

// authentication service
import AuthenticationAPI from "../services/AuthenticationAPI";
import SocialAuth from "../components/SocialAuth";

 function Register(){

     const [state,dispatch]=useContext(Context); //Gloabl state
     const navigate=useNavigate();
     const { t, i18n } = useTranslation(); // for Language translation
     const[totalAnswered,setTotalAnswered]=useState(0);
     const[totalCorrectAnswered,setTotalCorrectAnswered]=useState(0);


     useEffect(()=>{


     },[]);

     const [values, setValues] = React.useState({
        name:'',
        email:'',
        password: '',
        showPassword: false,
        passwordConfirmation:'',
        showPasswordConfirmation:false,
        error:false,
        message:'',
        registered:false,
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

    const handleClickShowPasswordConfirmation = () => {
        setValues({
            ...values,
            showPasswordConfirmation: !values.showPasswordConfirmation,
        });
        };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister=()=>{
        AuthenticationAPI.register(values.name,values.email,values.password,values.passwordConfirmation,state.user.language)
        .then((result)=>{
            console.log(result);
            if (result.data.status){
                setValues({
                    ...values,
                    registered: true,
                });
            }
        })
        .catch(error=>{
          if (error.response) {
            setValues({
              ...values,
              error: !error.response.data.status,// true or false
              message:error.response.data.message,
              registered: false,
            });


          }else{
            alert(error)
          }

        });
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
                    {t("Admin Registration")}
                </Typography>
                <Divider  variant="middle" />

                <Grid container spacing={3}>
                <Grid item xs={12} sx={{alignItems:"center"}}>

                    {!values.registered &&
                    <>
                    <Stack
                    direction="column"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    mt={2}

                    >
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                            <OutlinedInput

                                error={values.error}
                                id="outlined-adornment-name"
                                type="text"
                                value={values.name}
                                onChange={handleCredChange('name')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    <AccountCircle />
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Name"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput

                                error={values.error}
                                id="outlined-adornment-email"
                                type="text"
                                value={values.email}
                                onChange={handleCredChange('email')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    <AccountCircle />
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Email"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                error={values.error}
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleCredChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password-confirmation">Re-Type Password</InputLabel>
                            <OutlinedInput
                                error={values.error}
                                id="outlined-adornment-password-confirmation"
                                type={values.showPasswordConfirmation ? 'text' : 'password'}
                                value={values.passwordConfirmation}
                                onChange={handleCredChange('passwordConfirmation')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordConfirmation}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.passwordConfirmation ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Re-Type Password"
                            />
                        </FormControl>

                        {values.error &&<Typography color="error" variant="overline" gutterBottom>{values.message}</Typography>}
                    </Stack>
                    </>
                    }


                    {values.registered&&<Typography color="success" variant="overline" gutterBottom>Thansk for registering as admin. Please contact admin to approve your account!</Typography>}


                </Grid>
                </Grid>

            </CardContent>
            <CardActions sx={{ justifyContent:"center", alignItems:"center"}}>
                <Button variant="outlined" color="secondary" onClick={handleRegister} >{t('Register')}</Button>
            </CardActions>

        </Card>


    </Grid>



     );
 }

 export default Register;
