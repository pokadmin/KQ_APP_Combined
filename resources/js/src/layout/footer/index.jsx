import { Link } from "@mui/material";
import { margin } from "@mui/system";
import React from "react";

function Footer(){
    var date=new Date();
    var year=date.getFullYear()

    return(
        // implment footer
        <div>
            <hr style={{marginBottom:"5px"}}></hr>
            <Link href="https://gyanmarg.guru/" target="_blank" color="secondary" underline="hover">© Gyanmarg@{year}</Link>
        </div>
    );
}

export default Footer;
