import React, { useEffect, useState } from "react";

import {
  USER_TOKEN,
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USERS,
} from "../EnvVar.js";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const UserInfo = () => {
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

  return (
    <Nav>
      <NavLink className="nav-link active fs-5" to="/">
        {userInfo.userName}
      </NavLink>
    </Nav>
  );
};

export default UserInfo;
