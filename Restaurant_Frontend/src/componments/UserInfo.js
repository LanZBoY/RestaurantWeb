import React, { useEffect, useState } from "react";

import {
  USER_TOKEN,
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USERS,
} from "../EnvVar.js";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "匿名使用者",
    email: "???",
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
        return res.json();
      })
      .then((userInfo) => {
        setUserInfo(() => userInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div
      style={{
        color: "white",
      }}
    >
      歡迎！{userInfo.userName}
    </div>
  );
};

export default UserInfo;
