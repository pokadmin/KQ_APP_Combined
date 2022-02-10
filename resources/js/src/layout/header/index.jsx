import React from "react";
import {NavLink} from "react-router-dom";
import { Container,Col,Row } from "react-bootstrap"

function Header(){

    return(
        // implment header

        <Col xs={12}>
            <Container>
                <Row>
                    <Col> (Need Some Icon here) Path Of Knowlede</Col>
                    <Col> (some content if required)</Col>
                    <Col> <NavLink key="login" to="/login">Home</NavLink> </Col>
                </Row>

            </Container>
            <hr></hr>
        </Col>

    );
}

export default Header;
