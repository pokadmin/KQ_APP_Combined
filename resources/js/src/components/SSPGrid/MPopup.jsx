import * as React from 'react';
import _ from "lodash";
import { useEffect } from 'react';
import PropTypes from 'prop-types'

import {
    Grid,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,Backdrop,CircularProgress
} from '@mui/material';
import Draggable from 'react-draggable'

import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-AddSWOPopup"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
}


function MPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [inputData,setInputData]=useState(props.allFields); // array of objects
  const [inputFields,setInputFields]=useState([]); // array fields corroespoinding to actual inputs that are bound

  var inputElements=[];
  const handleClickOpen = () => {
    setOpen(true);
  };


    const handleChange=(event)=>{
      setInputFields({...inputFields,[event.target.name]:event.target.value})

    }

    const handleClose = (event,reason) => {
        console.log(event,reason);
        if(reason!="backdropClick"){
            setOpen(false);
            props.closePopup();
        }

    };

    const handleSave = () => {
      console.log('handling save');
      props.onSave(inputFields);
      //setOpen(false);
    };


    useEffect(()=>{
        setOpen(props.dialogOpen);
        if(props.dialogOpen){// only when true
            setInputData(props.allFields);
            //console.log('input data is being set');
        }
    },[props.dialogOpen,props.allFields]);


    // create an array of key and value pairs of input fields so that we can track changes
    useEffect(()=>{
        var fieldsArr=[];
        var columns=inputData.columns;
        var currentRow=inputData.row;
        console.log('inputData from Mpopup',inputData);
        columns.map((obj)=>{
            fieldsArr[obj.field]=currentRow[obj.field]??'';
        })

        // set the id field as well - used for updates
        if(currentRow['id']){
            fieldsArr['id']=currentRow['id'];
        }

        setInputFields(fieldsArr);
        //console.log('input fields are being set');
    },[inputData]);

    // create jsx objects for required input types and put them in array
    inputData.columns.map((obj)=>{
      if(obj.type=="TextField" && obj.required){

          inputElements.push(
              <Grid item xs={6} key={obj.field}>
                  <TextField
                  key={obj.field}
                  margin="normal"
                  name={obj.field}
                  label={obj.headerName}
                  value={inputFields[obj.field]}
                  onChange={handleChange}
                  sx={{minWidth:'150px'}}
                  inputProps={obj.charlimit &&{ maxLength:obj.charlimit}}
                  multiline
                  />
              </Grid>
          );
      };

      if(obj.type=="Select" && obj.required ){
          inputElements.push(
              <Grid item xs={6} key={obj.field}>
                  <TextField
                  key={obj.field}
                  margin="normal"
                  name={obj.field}
                  label={obj.headerName}
                  value={inputFields[obj.field]}
                  onChange={handleChange}
                  sx={{minWidth:'150px'}}
                  multiline
                  select
                  >
                      {obj.options.map((optionValue)=>(
                          <MenuItem key={optionValue} value={optionValue}>
                          {optionValue}
                      </MenuItem>
                      ))}

                  </TextField>
              </Grid>
          );
      }

      if(obj.type=="Date" && obj.required){

        inputElements.push(
            <Grid item xs={6} key={obj.field}>
                 <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={props.isDataProcessing}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        key={obj.field}
                        name={obj.field}
                        label={obj.headerName}
                        value={inputFields[obj.field]}
                        onChange={(newValue)=>{
                            setInputFields({...inputFields,[obj.field]:newValue.format('DD-MMM-YYYY')})
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="DD-MMM-YYYY"
                    />
                </LocalizationProvider>
            </Grid>
        );
    };


    });


  return (
    <div>
      <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-AddSWOPopup"
     >
        <DialogTitle  style={{ cursor: 'move' }} id="draggable-dialog-AddSWOPopup">Enter Data</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
              {

                  inputData && inputElements.map((ele)=>ele)
              }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


MPopup.prototype={
    onSave:PropTypes.func.isRequired,
    dialogOpen:PropTypes.bool.isRequired,
    allFields:PropTypes.object.isRequired,
    closePopup:PropTypes.func.isRequired
}

export default MPopup;
