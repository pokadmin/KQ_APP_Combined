import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import SSPGrid from './../components/SSPGrid';

function Admin(){

    const navigate=useNavigate(); // for manual routing

    const columns = [
        {
            field: 'SWO',
            headerName: 'SWO#',
            width: 100,
            required:true, // determins if it will be shown while adding new row
            type:"TextField"
        },
        {
            field: 'stage',
            headerName: 'Stage',
            width: 200,
            type:"TextField",
            renderCell:'Expand'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
        },
        {
            field: 'quote_status',
            headerName: 'Quote',
            width: 100,
            required:true,
            type:"Select",
            options:["Not Required","Required","Quoted"]
        },
    ];

    return(
    <Grid
        container
        alignItems="center"
        justifyContent="center"
        p={2}
    >
        <AppBar position="static">
        <Toolbar variant="dense">
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>

              <Button
                onClick={()=>{navigate('/admin/addQA')}}
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
                <AddCardIcon></AddCardIcon>
                <Typography sx={{display: { xs: 'none', md: 'flex' }, ml:1}}> Add Q/A</Typography>
              </Button>
              <Button
               /*  onClick={handleCloseNavMenu} */
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
               <EditIcon></EditIcon>
               <Typography sx={{display: { xs: 'none', md: 'flex' }, ml:1}}> Edit Q/A</Typography>
              </Button>
              <Button
               /*  onClick={handleCloseNavMenu} */
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
                <PreviewIcon></PreviewIcon>
                <Typography sx={{display: { xs: 'none', md: 'flex' }, ml:1}}> Review</Typography>
              </Button>

          </Box>
        </Toolbar>
        </AppBar>
        <Container>
            <SSPGrid
                key="adminCRUDTable"
                columns={columns}
                getPaginatedResource={''}
                addRowServer={''}
                updateRowServer={''}
                actions={{enable:true,edit:true,delete:false}}
                onRowSelection={''}
                updatedRows={''} // passing down the updated row and will be watched in child components for update
                /*  ref={SSPGridRef} */
            />
        </Container>
    </Grid>

    );
}

export default Admin;
