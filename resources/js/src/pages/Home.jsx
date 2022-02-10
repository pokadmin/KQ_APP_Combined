import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Login(){

    return(

        <Container fluid>
            <h1>Home Page</h1>
            <h4>Language Selection</h4>
            <NavLink key="test" to="/test">Start Test</NavLink>
            <br></br>
            <NavLink key="admin" to="/admin">Are you an Admin?</NavLink>
        </Container>
    );
}

export default Login;
