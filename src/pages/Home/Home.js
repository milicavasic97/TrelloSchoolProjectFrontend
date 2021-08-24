import React from 'react';
import { Col, Container, Row, Nav, NavItem, NavLink } from 'reactstrap';
import './Home.css';
import { Boards } from './components/Boards';
import { Organisations } from './components/Organisations';


export const Home = () => {


    return (
        <div className="home-background">
            <div className="page-padding-top trello-layout-overflow">
                <Container className=" trello-layout-overflow">
                    <Row >
                        <Col md="4" className="trello-organisations-container rajdhani-font">
                            <Organisations />
                        </Col>
                        <Col md="8">
                            <div>
                                <h2>Organisation name</h2>
                                <h3>description</h3>
                            </div>
                            <Nav tabs className="org-info-nav-menu">
                                <NavItem>
                                    <NavLink href="#" className="active">Boards</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Members</NavLink>
                                </NavItem>
                            </Nav>
                            <Boards />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
