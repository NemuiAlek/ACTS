import { useEffect, useState, useContext } from "react";
import {Link, useLocation} from "react-router-dom";
import UserContext from "../contexts/UserContext";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navz(){
    const { theUser, logout } = useContext(UserContext);
    const location = useLocation();

    if(location.pathname === '/'){
        return null
    }

    return (
        <Navbar variant="dark" bg="dark" expand="sm">
          <Container fluid>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className='m-auto'>

                <NavDropdown
                  id="monsterDropdown"
                  title="Monster"
                  menuVariant="dark"
                  className="navItem"
                >
                  <NavDropdown.Item as={Link} to={"/Monster/standard"}>Standard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/Monster/custom"}>Custom</NavDropdown.Item>

                  {theUser && (
                    <div>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to={"/Monster/create-modify/new"}>Create</NavDropdown.Item>
                  </div>
                  )}

                  {!theUser && (
                    <div>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to={"/SignUp"}>Create</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/SignUp"}>Update</NavDropdown.Item>
                  </div>
                  )}

                </NavDropdown>

                <NavDropdown
                  id="combatDropdown"
                  title="Combat"
                  menuVariant="dark"
                  className="navItem"
                >
                  <NavDropdown.Item as={Link} to={"/combatTracker"}>New</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/combatTracker"}>Load</NavDropdown.Item>

                </NavDropdown>

                {!theUser && (
                  <div>
                    <Nav.Item className="navItem">
                      <Nav.Link as={Link} to={"/SignUp"}>Sign Up</Nav.Link>
                    </Nav.Item>
                  </div>
                )}

                {!theUser &&(
                  <div>
                    <Nav.Item className="navItem">
                      <Nav.Link as={Link} to={"/LogIn"}>Log In</Nav.Link>
                    </Nav.Item>
                </div>
                )}

                {theUser &&(
                  <div>
                    <Nav.Item className="navItem">
                      <Nav.Link as={Link} to={"/Profile/"+theUser.id}>Profile</Nav.Link>
                    </Nav.Item>
                </div>
                )}

                {theUser &&(
                  <div>
                    <Nav.Item className="navItem">
                      <Nav.Link onClick={logout}>Log Out</Nav.Link>
                    </Nav.Item>
                </div>
                )}



              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );

    }