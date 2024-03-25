import React, { useState } from "react";
import { USER_TOKEN } from "../model/UserModel.js";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { BACKEND_SEVICE_ROOT, BACKEND_SERVICE_USERS } from "../EnvVar.js";
import PropTypes from "prop-types";

const RegisterModal = ({ showRegister, setShowRegister, setIsLogin }) => {
  const handleClose = () => {
    setShowRegister(() => false);
    setRegisterUser(() => {
      return {
        userName: "",
        password: "",
        mail: "",
      };
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, setRegisterUser] = useState({
    userName: "",
    password: "",
    mail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerUser);
    fetch(`${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USERS}/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUser),
    })
      .then((res) => {
        console.log(res);
        return res.text();
      })
      .then((data) => {
        window.localStorage.setItem(USER_TOKEN, data);
        handleClose();
        setIsLogin(() => true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Modal show={showRegister} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>註冊新帳戶</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.FloatingLabel label="帳戶名稱">
              <Form.Control
                name="userName"
                type="text"
                value={registerUser.userName}
                required
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
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
                  value={registerUser.password}
                  required
                  onChange={(e) =>
                    setRegisterUser({
                      ...registerUser,
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
          <Form.Group className="mb-3">
            <Form.FloatingLabel label="電子郵件">
              <Form.Control
                name="email"
                type="text"
                value={registerUser.mail}
                required
                onChange={(e) =>
                  setRegisterUser({
                    ...registerUser,
                    mail: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.FloatingLabel>
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
