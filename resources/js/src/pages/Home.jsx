import React from "react";
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
  Box
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
//import guruSeeker from '../images/guru_seeker.jpg';
import { borderRadius, maxWidth } from "@mui/system";

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
                         <ul>
                            <li><Typography varient="body2">{t('Rule1')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule2')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule3')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule4')}</Typography></li>
                            <li><Typography varient="body2">{t('Rule5')}</Typography></li>
                        </ul>

                    <Typography paragraph varient="body2">{t('GeneralInfo')}</Typography>



                </Grid>

            </CardContent>
            <CardActions sx={{ justifyContent:"center", alignItems:"center"}}>
                <Button variant="outlined" color="secondary" onClick={()=>{navigate('/test')}} endIcon={<SendIcon />}>{t('Start Test')}</Button>

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
                <Button onClick={handleDialogClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </Grid>


  );
}

export default Home;
