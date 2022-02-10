import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Admin(){

    return(
        // implment admin
        <Container fluid>
            <h1>Admin Page</h1>
            <h4>Add/ Update Questions and answers here</h4>
            <NavLink key="test" to="/test">Start Test</NavLink>
        </Container>
    );
}

export default Admin;
