import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const RegisterModal = ({ showRegister, setShowRegister }) => {
  const handleClose = () => {
    setShowRegister(false);
    setRegisterUser({
      userName: "",
      passowrd: "",
      email: "",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, setRegisterUser] = useState({
    userName: "",
    passowrd: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerUser);
  };
  return (
    <Modal show={showRegister} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>註冊新帳戶</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>帳戶名稱</Form.Label>
            <Form.Control
              name="userName"
              type="text"
              value={registerUser.userName}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  userName: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>密碼</Form.Label>
            <InputGroup>
              <Form.Control
                name="password"
                type={showPassword ? "text" : "password"}
                value={registerUser.passowrd}
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    passowrd: e.target.value,
                  })
                }
              ></Form.Control>
              <Button onClick={() => setShowPassword(!showPassword)}>
                顯示
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>電子郵件</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={registerUser.email}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  email: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            註冊
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

RegisterModal.propTypes = {
  showRegister: PropTypes.bool,
  setShowRegister: PropTypes.func,
};

export default RegisterModal;
