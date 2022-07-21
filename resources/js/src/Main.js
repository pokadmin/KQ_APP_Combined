import React,{useReducer} from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import {Container,Row,Col} from "react-bootstrap";
import Store from "./store";
import Footer from "./layout/footer";
import Header from "./layout/header";
import Content from "./layout/content";
import routes from "./routes";

function Main(){
    const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
    });

    return(
        <Store>
            <Container fluid>
                <Row>
                    <Header />
                </Row>
                <Row>
                    <Content >
                        <Container
                        style={{
                            height:'85vh',
                            maxHeight:'85vh',
                            overflow:'auto'
                        }}
                        >
                            <Routes>
                                {getRoutes(routes)}
                                <Route path="*" element={<Navigate to="/home" />} />
                            </Routes>
                        </Container>
                    </Content>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        </Store>
    );
}

export default Main;
