import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Test(){

    return(
        <Container fluid>
            <h1>Test Page</h1>
            <h4>Start your test here</h4>
            <NavLink key="result" to="/result">End and show reults</NavLink>
        </Container>


    );
}

export default Test;
