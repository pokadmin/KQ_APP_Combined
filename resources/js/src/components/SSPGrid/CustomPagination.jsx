import React from "react";
import { Box,Button, Divider, Stack } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";

import Pagination from '@mui/material/Pagination';
import { useState } from "react";

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const [searchPage,setSearchPage]=useState('');

    const clearSearch=()=>{
        setSearchPage('');
    };
    const handleEnterPress=(event)=>{
        if(event.key==="Enter"){
            apiRef.current.setPage(searchPage-1);
        }
    }

    const handleChange=(event)=>{

        setSearchPage(event.target.value);

    }

    return (

        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            alignItems="center"
            spacing={2}
        >
            <TextField
            variant="standard"
            placeholder="Go to Page…"
            value={searchPage}
            onChange={handleChange}
            onKeyPress={handleEnterPress}
            InputProps={{
                startAdornment: <SearchIcon fontSize="small" />,
                endAdornment: (
                <IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    onClick={clearSearch}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
                ),
            }}
            sx={{
                width:'20ch',
                m: (theme) => theme.spacing(0.5, 0.5, 0.5),
                '& .MuiSvgIcon-root': {
                mr: 0.5,
                },
                '& .MuiInput-underline:before': {
                borderBottom: 1,
                borderColor: 'divider',
                },
            }}
            />
             <Pagination
                color="primary"
                count={pageCount}
                page={page + 1}
                onChange={(event, value) => apiRef.current.setPage(value - 1)} //value - 1
            />
        </Stack>

    );
}

export default CustomPagination;
