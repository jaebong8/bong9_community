import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../firebase";

function Heading() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const LogOutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BONG9's Community
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>

            <Nav.Link as={Link} to="/upload">
              UPLOAD
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken === "" ? (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Log In
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/MyPage">
                MyPage
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  LogOutHandler();
                }}
              >
                Log Out
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;
