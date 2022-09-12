import React,{useContext} from "react";
import { Container, Col, Row, Navbar,Nav } from "react-bootstrap"
import tomato from "../../icons/tomato-icon-small.png"
import {Context} from "../../store"
import {useTranslation} from 'react-i18next'
import { NavLink, useNavigate } from "react-router-dom";
import { GearFill } from 'react-bootstrap-icons';

function Header() {

    const [state,dispatch]=useContext(Context);
    const { t, i18n } = useTranslation();
    const navigate=useNavigate(); // for manual routing

    const handleLoginClick=()=>{
        dispatch({type:"authentication",payload:{showLogin:true}})
    }

    const handleLogoutClick=()=>{
       console.log('now handle logout');
    }

	return (
			// implment header

		<>

				<Navbar bg="dark" variant="dark">
					<Container fluid>
						<Navbar.Brand style={{cursor:"pointer"}} >
							<span onClick={()=>{navigate('/home')}}>
                                <img
                                    alt=""
                                    src={tomato}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                                {t('Knowledge Quotient')}
                            </span>
                            <span onClick={()=>{navigate('/admin')}}>
                                {' '}
                                {state.user.type=='admin'&&
                                <button className="btn btn-secondary"><GearFill></GearFill></button>
                                }
                            </span>


						</Navbar.Brand>
                        <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                {state.user.type=='guest'&&
                                    <>{t('Guest')}&nbsp;&nbsp;|</>
                                }
                                {state.user.type!='guest'&&
                                    <>{state.user.username}&nbsp;&nbsp;|</>
                                }

                            </Navbar.Text>
                            <Nav>

                                {state.user.type=='guest'&&
                                <Nav.Link onClick={handleLoginClick}>Admin login</Nav.Link>
                                }

                                {state.user.type!='guest'&&
                                <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
                                }

                            </Nav>
                            </Navbar.Collapse>
					</Container>
				</Navbar>

					{/* <Row>
							<Col> (Need Some Icon here) Path Of Knowlede</Col>
							<Col> (some content if required)</Col>
							<Col> <NavLink key="login" to="/login">Home</NavLink> </Col>
					</Row>
					*/}


		</>

	);
}

export default Header;
