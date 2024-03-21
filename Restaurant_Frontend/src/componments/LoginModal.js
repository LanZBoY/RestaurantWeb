import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
const LoginModal = ({ showLogin, setShowLogin }) => {
  const handleClose = () => {
    setShowLogin(!showLogin);
    setLoginUser({
      userName: "",
      password: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, setLoginUser] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginUser);
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
                value={loginUser.userName}
                onChange={(e) =>
                  setLoginUser({
                    ...loginUser,
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
                  type={showPassword ? "password" : "text"}
                  value={loginUser.password}
                  onChange={(e) =>
                    setLoginUser({
                      ...loginUser,
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
};

export default LoginModal;
