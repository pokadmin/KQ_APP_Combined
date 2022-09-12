import React from "react";
import PropTypes from 'prop-types';
import { Box,Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';



function CustomToolbar(props) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />

            { /* Quick Serach Toolbar */ }
            <Box
                sx={{
                p: 0.5,
                pb: 0,
                }}
            >
                <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                    <IconButton
                        title="Clear"
                        aria-label="Clear"
                        size="small"
                        style={{ visibility: props.value ? 'visible' : 'hidden' }}
                        onClick={props.clearSearch}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                    ),
                }}
                sx={{
                    width: {
                    xs: 1,
                    sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                    mr: 0.5,
                    },
                    '& .MuiInput-underline:before': {
                    borderBottom: 1,
                    borderColor: 'divider',
                    },
                }}
                />
            </Box>
            <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={props.onAdd}>
                Add Row
            </Button>

        </GridToolbarContainer>

    );
}

CustomToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd:PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};



export default CustomToolbar;

