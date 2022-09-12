import React, { useEffect,useImperativeHandle,useState,useContext } from "react";
import { Context } from "../../store";
import PropTypes from "prop-types";

import {DataGrid,GridActionsCellItem } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";
import CustomPagination from "./CustomPagination";
import MPopup from "./MPopup";
import ConfirmDialog from "../ConfirmDialog";

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse  from "@mui/material/Collapse";
import RenderCellExpand from "./renderCellExpand";
import { List } from "@mui/material";




const SSPGrid=React.forwardRef((props,ref)=>{
    const {getPaginatedResource,updateRowServer,deleteRowServer,addRowServer,columns,actions,onRowSelection,updatedRows,addRow}=props;
    const [searchText, setSearchText] = React.useState('');
    const [popupOpen,setPopupOpen]=useState(false);
    const [alertState,setAlert]=useState({open:false,severity:"success",message:''});
    const [confirmationOpen,setconfirmationOpen]=useState(false);
    const[state,dispatch]=useContext(Context);
    const rowState=state.SSPGrid.rowState;


    const [currentEditRow,setCurrentEditRow]=useState({row:[],columns:[]});
    const [deleteRowIndex,setDeleteRowIndex]=useState(null);

    // generate action column based on prop values
    const actionSettings=actions;

    const ModifiedColumns=[...columns];
    const actionColumn={
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        cellClassName: 'actions',
        getActions: (params) => {
            const defaultActionArray=[];

            if(actionSettings.enable && actionSettings.edit){
                defaultActionArray.push(
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(params)}
                        color="inherit"
                    />
                );
            }

            if(actionSettings.enable && actionSettings.delete){
                defaultActionArray.push(
                    <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(params)}
                    color="inherit"
                />
                );
            }
        return defaultActionArray;
        },
    }
    // add action column only if it's enabled
    if(actionSettings.enable){
        ModifiedColumns.splice(0,0,actionColumn); // index at which t0 insert, delete count=0, item
    }


    // allow access to parent compoenets for below addRow() and rowState
    useImperativeHandle(ref,()=>({
        addRow(data){
            handleAddRowClick(data);
        },
        rowState:rowState
    }),[rowState,rowState.rows]);


    const handleEditClick = (params) => (event) => {
        event.stopPropagation();
        var modifiedColumns;
        modifiedColumns=columns.map((obj)=>({...obj,required:true})); // makes all fields editable
        setCurrentEditRow({row:params.row,columns:modifiedColumns});
        setPopupOpen(true);
        console.log('edit params',modifiedColumns);
    };

    const handleDeleteClick = (params) => (event) => {
        event.stopPropagation();
        console.log('delete params',params,event);
        setDeleteRowIndex(params.id);
        setconfirmationOpen(true);
        //apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };

    const handleAddRowClick=(data)=>{
        data=data||{}; // initialize to data or make it blank
        const addableFields={};
        function callback(obj){ // forms an object containing required fields initialized to empty values
            if(obj.required){
               Object.assign(addableFields,{[obj.field]:this[obj.field]??''});
            }
        }
        columns.map(callback,data);
        setCurrentEditRow({row:addableFields,columns:columns});
        setPopupOpen(true);
    }

    const handleRowSave=(params)=>{

        if(params.id){

              // update data on server and thentable
              updateRowServer(params).then(res=>{
                console.log('res',res);
                if(res.data.status){
                  setAlert(()=>({open:true,severity:'success',message:res.data.message??'success'}));

                    const modifiedRows=rowState.rows.map(object=>{
                        if(object.id==params.id){
                            return params;
                        }else{
                            return object;
                        }
                    });

                     // update the table

                    dispatch({type:'setRowState',payload:{rowState:{...rowState,rows:modifiedRows}}});
                    setPopupOpen(false); // close the popup
                }else{
                  setAlert(()=>({open:true,severity:'error',message:res.data.message??'Error'}));
                }
               })
               .catch(err=>{
                console.log(err);
                alert(err);
               // setAlert(()=>({open:true,severity:'error',message:err??'Error'}));
               })

        }else{ // new row being added

             // update data on server and thentable
            addRowServer(params).then(res=>{
              console.log('res',res);
              if(res.data.status==true || res.data.status=='true'){
                setAlert(()=>({open:true,severity:'success',message:res.data.message??'success'}));

                // add a temp id
                const currentLastRowIndex=rowState.rows.length+1;
                const newRow={...params,id:currentLastRowIndex+1}
                // update the table
                dispatch({type:'setRowState',payload:{rowState:{...rowState,rows:[...rowState.rows,newRow]}}});
                setPopupOpen(false);
            }else{
                setAlert(()=>({open:true,severity:'error',message:res.data.message??'Error'}));
              }
             })
             .catch(err=>{
                console.log(err);
                alert(err);
               // setAlert(()=>({open:true,severity:'error',message:err??'Error'}));
             })

        }
    }

    const handleCancelClick = (id) => (event) => {
        event.stopPropagation();
        setGridState((props)=>({...props,editMode:false}));

        const row = apiRef.current.getRow(id);
        if (row.isNew) {
            apiRef.current.updateRows([{ id, _action: 'delete' }]);
        }
    };

    const handleDeleteRowConfirmation=()=>{
        // delete row on server
        deleteRowServer(deleteRow); //id

        const rowTobeDeleted=deleteRowIndex-1;
        const modifiedRows=[
            rowState.rows.slice(0,rowTobeDeleted),
            rowState.rows.slice(rowTobeDeleted+1)
        ];

        dispatch({type:'setRowState',payload:{rowState:{...rowState,rows:modifiedRows}}});

        // close the confimation dialog
        setconfirmationOpen(false);
    }

    const handleError=(error)=>{
      alert('errorHandler',error);

    }

    const handleRowSelectionChange=(newSelectionModel)=>{
      const selectedRows=[];
      newSelectionModel.map(id=>{
        rowState.rows.map(obj=>{
          if(obj.id==id){
            selectedRows.push(obj);
          }
        })
      })
      onRowSelection(selectedRows); //call parent function same as fire event.
    }



    const addCellRendrer=(columns)=>{
        const updatedColumns=columns.map(column=>
            column.renderCell==='Expand'
            ?{...column,renderCell:RenderCellExpand}
            :column
            );
        return updatedColumns;
    }


    const requestSearch = async (searchValue) => {
        setSearchText(searchValue); // set the state
        const result=await getPaginatedResource(rowState.page,rowState.pageSize,searchText);
        const totalRows=result.data.meta.total;
        dispatch({type:'setRowState',payload:{rowState:{...rowState,rows:result.data.data,rowCount:totalRows,loading:false}}});
    };




     const SSPColumns=addCellRendrer(ModifiedColumns); // add cell expansion function

    /**
     * Actions to be formed when pagination happens
     */
    useEffect(async ()=>{
        console.log('SSP Grid mounted');
        dispatch({type:'setRowState',payload:{rowState:{...rowState,loading:true}}});

        //fetch the data
        const result=await getPaginatedResource(rowState.page,rowState.pageSize);
        const totalRows=result.data.meta.total;
        dispatch({type:'setRowState',payload:{rowState:{...rowState,rows:result.data.data,rowCount:totalRows,loading:false}}});

    },[rowState.page,rowState.pageSize]);


    /**
     * Actions to be performed when rows are updated
     */
    useEffect(()=>{
        if(!updatedRows){
            return false;
        }
        console.log('SSPGrid-> updating rows',updatedRows);
        dispatch({type:'setRowState',payload:{rowState:{...rowState,loading:true}}});

        const modifiedRows=rowState.rows.map(object=>{
            if(object.id==updatedRows.id){
                return updatedRows;
            }else{
                return object;
            }
        });

        dispatch({type:'setRowState',payload:{rowState:{...rowState,rows:modifiedRows,loading:false}}});
    },[updatedRows]);



    return(
        <>
          <Collapse in={alertState.open}>
            <Alert variant="outlined" severity={alertState.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(()=>({open:false,message:'',severity:"success"}));
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
                {

                    typeof alertState.message=="object"&&Object.entries(alertState.message).map(([key,val])=>(
                        <List key={key}>{key} => {val}</List>
                    ))

                }
                {
                     typeof alertState.message=="string" && <List>{alertState.message}</List>
                }

            </Alert>
          </Collapse>
        <DataGrid
            components={{
                Toolbar: CustomToolbar,
                Pagination: CustomPagination,
             }}
            columns={SSPColumns}
            {...rowState}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            paginationMode="server"
            onPageChange={(page)=> dispatch({type:'setRowState',payload:{rowState:{...rowState,page:page}}})}
            onPageSizeChange={(pageSize)=>(
                //setRowState((prev)=>({...prev,pageSize}))
                dispatch({type:'setRowState',payload:{rowState:{...rowState,pageSize:pageSize}}})
            )}
            onSelectionModelChange={handleRowSelectionChange}
            onError={handleError}
            checkboxSelection
            disableSelectionOnClick
            componentsProps={{
                toolbar: {
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    onAdd:()=>handleAddRowClick(),
                    clearSearch: () => requestSearch(''),
                },
            }}

            editMode="row"
            ref={ref}
        >

        </DataGrid>
        <MPopup
        dialogOpen={popupOpen}
        allFields={currentEditRow}
        onSave={handleRowSave}
        closePopup={()=>setPopupOpen(false)}
        ></MPopup>
        <ConfirmDialog
            onConfirm={handleDeleteRowConfirmation}
            onClose={()=>setconfirmationOpen(false)}
            confirmationOpen={confirmationOpen}
            confirmationText="Confirm Delete!"
        />


        </>
    );
});

SSPGrid.propTypes = {
   /*  getPaginatedResource: PropTypes.func.isRequired,
    updateRowServer:PropTypes.func.isRequired,
    deleteRowServer:PropTypes.func.isRequired,
    addRowServer:PropTypes.func.isRequired,
    columns:PropTypes.arrayOf(PropTypes.object).isRequired,
    actions:PropTypes.object,
    onRowSelection:PropTypes.func */
};

export default SSPGrid;

