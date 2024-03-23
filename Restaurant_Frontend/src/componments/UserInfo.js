import React, { useEffect, useState } from "react";

import {
  USER_TOKEN,
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USERS,
} from "../EnvVar.js";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";

const UserInfo = ({ setIsLogin }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "尚未登入",
    email: "...",
  });
  useEffect(() => {
    const token = window.localStorage.getItem(USER_TOKEN);
    fetch(`${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USERS}`, {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status == 400) {
          throw {
            type: "Token Expired",
            statusCode: res.status,
          };
        }
        return res.json();
      })
      .then((userInfo) => {
        console.log(userInfo);
        setUserInfo(() => userInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem(USER_TOKEN);
    setIsLogin(() => false);
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
