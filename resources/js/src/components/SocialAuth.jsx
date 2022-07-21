import {Stack,Button,IconButton} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { blue } from "@mui/material/colors";

const SocialAuth=()=>{
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
                padding: "0.5675rem",
                flex: 1,
              }}
            >
              <GoogleIcon sx={{color:'#4285F4'}} />
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
