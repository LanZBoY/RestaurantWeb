import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_SEVICE_ROOT, BACKEND_SERVICE_USER } from "../EnvVar.js";
import { USER_TOKEN } from "../model/UserModel.js";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { changeLoginState } from "../store/slice.js";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "尚未登入",
    email: "...",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN);
    fetch(`${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USER}`, {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((userInfo) => {
        window.localStorage.setItem(USER_TOKEN, userInfo.newToken);
        setUserInfo(() => userInfo);
      })
      .catch(() => {
        window.localStorage.removeItem(USER_TOKEN);
        navigate("/");
        dispatch(changeLoginState());
      });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem(USER_TOKEN);
    dispatch(changeLoginState());
  };

  return (
    <Nav>
      <NavLink className="nav-link active" to="/rates">
        {userInfo.userName}
      </NavLink>
      <NavLink className="nav-link" onClick={handleLogout}>
        登出
      </NavLink>
    </Nav>
  );
};

UserInfo.propTypes = {
  setIsLogin: PropTypes.func,
};

export default UserInfo;
