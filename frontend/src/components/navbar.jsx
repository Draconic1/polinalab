import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

import logo from "../logo.svg";
import { logout } from "./reducerSlice";

const Component = () => {
  const orders = useSelector((state) => state.toolkit.orders);
  const isLoggedIn = useSelector((state) => state.toolkit.isLoggedIn);
  const user = useSelector((state) => state.toolkit.user);
  const dispatch = useDispatch();

  const exit = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Navbar expand="lg" className="footer bg-gradient py-3" style={{backgroundColor:'#38609b'}}>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex flex-row align-items-center text-white"
        >
          <img
            src={logo}
            style={{ height: `44px` }}
            className="me-3"
            alt="logo"
          />
          Парковки университета
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Домашняя страница
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">
              О Паркинге
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn && (
            <Nav.Link as={Link} to="/cart" className="text-white">
              {orders && orders.length > 0 && (

                  <Badge bg="secondary" className="me-1">
                  {orders.filter((x) => x.status === 1).length}
                </Badge>
              )}
              Корзина
            </Nav.Link>
            )}
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" className="text-white">
                  {user.email}
                </Nav.Link>
                <Nav.Link onClick={exit} className="text-white">Выйти</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Войти
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Зерегистрироваться
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Component;
