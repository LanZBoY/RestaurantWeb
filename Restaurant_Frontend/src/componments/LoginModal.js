import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import {
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USERS,
  USER_TOKEN,
} from "../EnvVar.js";
const LoginModal = ({ showLogin, setShowLogin, setIsLogin }) => {
  const handleClose = () => {
    setShowLogin(!showLogin);
    setLoginInfo({
      userName: "",
      password: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USERS}/login`, {
      method: "POST",
      headers: {
        contentType: "application/json",
        ...loginInfo,
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        window.localStorage.setItem(USER_TOKEN, data);
        const userToken = window.localStorage.getItem(USER_TOKEN);
        return userToken === null ? false : true;
      })
      .then((loginResult) => {
        setIsLogin(loginResult);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal show={showLogin} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>登入</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.FloatingLabel label="帳戶名稱">
              <Form.Control
                name="userName"
                type="text"
                value={loginInfo.userName}
                onChange={(e) =>
                  setLoginInfo({
                    ...loginInfo,
                    userName: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup>
              <Form.FloatingLabel label="密碼">
                <Form.Control
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginInfo.password}
                  onChange={(e) =>
                    setLoginInfo({
                      ...loginInfo,
                      password: e.target.value,
                    })
                  }
                ></Form.Control>
              </Form.FloatingLabel>
              <Button onClick={() => setShowPassword(!showPassword)}>
                顯示
              </Button>
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            登入
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

LoginModal.propTypes = {
  showLogin: PropTypes.bool,
  setShowLogin: PropTypes.func,
  setIsLogin: PropTypes.func,
};

export default LoginModal;
