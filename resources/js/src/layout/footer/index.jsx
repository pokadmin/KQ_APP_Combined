import { Link } from "@mui/material";
import { margin } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

function Footer(){
    const { t, i18n } = useTranslation(); // for language translation
    var date=new Date();
    var year=date.getFullYear()

    return(
        // implment footer
        <div>
            <hr style={{marginBottom:"5px"}}></hr>
            <Link href="https://gyanmarg.guru/" target="_blank" color="secondary" underline="hover">© {t("Gyanmarg")}@{year}</Link>
        </div>
    );
}

export default Footer;
