import React, {useState, useEffect} from 'react';
import {Stack,Button,IconButton} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { blue } from "@mui/material/colors";

import { GoogleLogin } from 'react-google-login';
/* import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'; */
import { method } from 'lodash';

const SocialAuth=()=>{
    const [loginUrl, setLoginUrl] = useState(null);
    const [clientId, setClientId] = useState(null);

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/auth',{
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        })
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('Something went wrong!');
        })
        .then((data)=>{
            setLoginUrl(data.url);
            setClientId(data.clientId);
        })
        .catch((error)=>console.log(error));

    },[]);

    const responseGoogle=(response)=>{
        console.log('respnose recived=>',response);

        fetch(`http://localhost:8000/api/auth/callback`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + response.tokenId,
            },
            method:'POST',
            body:JSON.stringify({credential:response.tokenId})

        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setData(data);
                console.log('received data',data);
            });
    }



    return (
        <>
          <Stack direction="row" spacing={2}>
            <IconButton
              sx={{
                border: "2px solid #ccc",
                borderRadius: "5px",
                padding: "0.5675rem",
                flex: 1,
              }}
            >
              <FacebookIcon sx={{color:"#4267B2"}}/>
            </IconButton>
            <IconButton
              sx={{
                border: "2px solid #ccc",
                borderRadius: "5px",
                padding: "0rem",
                flex: 1,
              }}
            >
             { clientId&&<GoogleLogin
                clientId={clientId}
                 onSuccess={responseGoogle}
                 onError={responseGoogle}
                 cookiePolicy={'single_host_origin'}
              />




             }

            </IconButton>
            <IconButton
              sx={{
                border: "2px solid #ccc",
                borderRadius: "5px",
                padding: "0.5675rem",
                flex: 1,
              }}
            >

              <TwitterIcon sx={{color:'#00acee'}} />
            </IconButton>
          </Stack>
        </>
      );
};

export default SocialAuth;
