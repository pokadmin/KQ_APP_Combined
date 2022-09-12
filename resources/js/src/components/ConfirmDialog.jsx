import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ConfirmDialog(props) {

    //const {onConfirm,confirmationText,confirmationOpen,onClose,...other}=props;

    const [confirmationOpen,setConfirmationOpen]=React.useState(false);

    const handleClose=()=>{
        //console.log('handle close in component fired');
        props.onClose();
    }

    const handleConfirm=()=>{
        //console.log('handle confirm in component fired');
        props.onConfirm();
    }

    useEffect(()=>{
        setConfirmationOpen(props.confirmationOpen);
    },[props.confirmationOpen]);

    return (

      <Dialog
        open={confirmationOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.confirmationText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    );
}


export default ConfirmDialog;
