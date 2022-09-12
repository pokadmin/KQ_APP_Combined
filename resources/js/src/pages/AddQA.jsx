import { Box, Grid, TextField } from "@mui/material";
import React from "react";

function AddQA(){
    return(
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            p={2}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                    id="question"
                    defaultValue="Question"
                    />
                    <TextField
                    error
                    id="question"
                    defaultValue="Answer1"
                    helperText=""
                    />
                </div>
            </Box>

        </Grid>
    );
}

export default AddQA;
