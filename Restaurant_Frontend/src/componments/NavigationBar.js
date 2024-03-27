import React from "react";
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
import { showLoginModal, showRegisterModal } from "../store/slice.js";
import { useDispatch, useSelector } from "react-redux";

const NavigationBar = ({
  showSearchBar = false,
  searchString,
  setSearchString,
}) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.UserState);
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
          {showSearchBar ? (
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
          {loginState.login ? (
            <UserInfo />
          ) : (
            <>
              <Button
                variant="success"
                className="me-2"
                onClick={() => dispatch(showRegisterModal())}
              >
                註冊
              </Button>
              <Button
                variant="success"
                onClick={() => dispatch(showLoginModal())}
              >
                登入
              </Button>
              <RegisterModal />
              <LoginModal />
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
