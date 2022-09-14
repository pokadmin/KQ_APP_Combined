import React, { useState } from "react";
import {Context} from "../store";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

import { grey } from "@mui/material/colors";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import {
  Button,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  TextField
} from "@mui/material";

import Visibility  from "@mui/icons-material/Visibility";
import VisibilityOff  from "@mui/icons-material/VisibilityOff";
import AccountCircle  from "@mui/icons-material/AccountCircle";

// authentication service
import AuthenticationAPI from "../services/AuthenticationAPI";
import { Box } from "@mui/system";


function Login(){
    const [state,dispatch]=useContext(Context);
    const { t, i18n } = useTranslation(); // for language translation

    const navigate=useNavigate(); // for manual routing

    const [isLoading, setIsLoading] = useState(false);

    const handleDialogClose=(event,reason)=>{
      if(reason && reason == "backdropClick")
      return;
      dispatch({type:"authentication",payload:{showLogin:false}})

    }


    // Login handling



    const [values, setValues] = React.useState({
        email:'',
        password: '',
        showPassword: false,
        error:false,
        message:''
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

    const handleLogin=()=>{
        setIsLoading(true);
        AuthenticationAPI.attempLogin(values.email,values.password)
        .then((result)=>{
            if(result.data.status==true){
                setIsLoading(false);
                // after sucessful response, remove previously set errors if any
                setValues({
                    ...values,
                    error: false,// true or false
                    message:''
                  });

                 // now set the user details and rights
                 dispatch({type:"changeUserType",payload:{
                    type:result.data.user.type,
                    username:result.data.user.name
                }})

                 // now close the login dialog and set authetication details
                 dispatch({type:"authentication",payload:{showLogin:false,isAuthenticated:true,authentictaedUser:result.data.user.name}});

            }
        })
        .catch(error=>{
            setIsLoading(false);
          if (error.response) {
            setValues({
              ...values,
              error: !error.response.data.status,// true or false
              message:error.response.data.message
            });


          }else{
            setIsLoading(false);
            alert(error)
          }

        });
    }

  return(


        <Dialog
            open={state.showLogin}
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
            <Typography variant="h5">{t('Login Details')}</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={3}>
                <Grid item xs={12} sx={{alignItems:"center"}}>

                    <Stack
                    direction="column"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                    mt={2}

                    >
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
                        {values.error &&<Typography color="error" variant="overline" gutterBottom>{values.message}</Typography>}
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>        
                    </Stack>
                </Grid>
                </Grid>
            </DialogContent>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}

            >

                <Stack
                    display="flex"
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: 1 }}
                >
                    <Button color="primary" variant="contained" onClick={handleLogin} disabled={isLoading}>Login</Button>
                    <Button color="primary" variant="contained" onClick={handleDialogClose}>Cancel</Button>
                </Stack>

            </Box>
        </Dialog>

  );
}

export default Login;
