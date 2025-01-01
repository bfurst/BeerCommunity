import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppNavbar = () => {
  const { isAuth, user } = useAuth();

  useEffect(() => {
    if (isAuth !== null) {
      const page = window.location.pathname;
      var elements = document.querySelectorAll(`a[href='${page}']:not(#user-profile)`);

      if (elements.length > 0)
        elements[0].classList.add('fw-bold');
    }
  }, [isAuth]);

  if (isAuth === null)
    return <Container className="d-flex h-100 my-auto justify-content-center" >
    </Container>

  return (

    <Navbar
      bg="light"
      expand="lg"
      className="opacity-75"
      data-bs-theme="light"
      style={{ minHeight: "66px", maxHeight: "66px", zIndex: "1000" }}
    >
      {
        isAuth ?
          <Container fluid>
            <Navbar.Brand>BeerCommunity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="wide-collapse">
              <Nav className="nav-links-left ms-3">
                <Nav.Link href="/user/home">Home</Nav.Link>
                <Nav.Link href="/about-us">About us</Nav.Link>
                <Nav.Link href={isAuth && user.role === "admin" ? "/admin/news" : "/news"}>News</Nav.Link>
                <Nav.Link href={isAuth && user.role === "admin" ? "/admin/breweries" : "/user/breweries"}>Breweries</Nav.Link>
              </Nav>
              <Nav className="ms-auto me-3">
                <Nav className="ms-auto me-3 d-flex align-items-center">
                  <Nav.Link href="/user/profile" id="user-profile">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <img
                        src={
                          user.profileImage
                            ? "https://localhost/uploads/profile/" + user.profileImage
                            : "https://localhost/uploads/profile/default-profile.svg"}
                        className="rounded-circle"
                        style={{ width: "32px", height: "32px", objectFit: "cover" }}
                      />
                      <div className="nav-link">Hello {user.username}!</div>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
          :
          <Container fluid>
            <Navbar.Brand>BeerCommunity</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="wide-collapse">
              <Nav className="nav-links-left ms-3">
                <Nav.Link href="/about-us">About us</Nav.Link>
                <Nav.Link href="/news">News</Nav.Link>
              </Nav>
              <Nav className="ms-auto me-3">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
      }
    </Navbar>
  );
}

export default AppNavbar;