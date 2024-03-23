import React, { useState } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  Button,
  InputGroup,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RegisterModal from "./RegisterModal.js";
import LoginModal from "./LoginModal.js";
import PropTypes from "prop-types";
import UserInfo from "./UserInfo.js";

const NavigationBar = ({ showSearchBar, searchString, setSearchString }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(() => {
    return window.localStorage.getItem("userToken") === null ? false : true;
  });
  return (
    <>
      <Navbar variant="dark" bg="primary" sticky="top">
        <Container>
          <Navbar.Brand className="fs-1 fw-bold">評餐廳</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              首頁
            </NavLink>
            <NavLink className="nav-link" to="/restaurants">
              列表
            </NavLink>
          </Nav>
          {showSearchBar === true ? (
            <Form className="me-auto w-50">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="想找的資訊"
                  aria-label="Search"
                  value={searchString}
                  onChange={(e) => setSearchString(() => e.target.value)}
                ></Form.Control>
              </InputGroup>
            </Form>
          ) : undefined}
          {isLogin ? (
            <UserInfo setIsLogin={setIsLogin} />
          ) : (
            <>
              <Button
                variant="success"
                className="me-2"
                onClick={() => setShowRegister(!showRegister)}
              >
                註冊
              </Button>
              <Button variant="success" onClick={() => setShowLogin(true)}>
                登入
              </Button>
              <RegisterModal
                showRegister={showRegister}
                setShowRegister={setShowRegister}
              />
              <LoginModal
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                setIsLogin={setIsLogin}
              />
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

NavigationBar.propTypes = {
  showSearchBar: PropTypes.bool,
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
};

export default NavigationBar;
