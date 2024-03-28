import React, { useEffect, useState } from "react";
import NavigationBar from "../componments/NavigationBar.js";
import { Container } from "react-bootstrap";
import {
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USER,
  BACKEND_SERVICE_RATE_HISTORY,
} from "../EnvVar.js";
import { USER_TOKEN } from "../model/UserModel.js";
import RateHistory from "../componments/RateHistory.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/slice.js";
import { UnloginMessage } from "../utils.js";

const RatesPage = () => {
  const [rateHistory, setRateHistory] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem(USER_TOKEN) == null) {
      dispatch(addMessage(UnloginMessage));
      navigate("/");
    }
    fetch(
      `${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USER}/${BACKEND_SERVICE_RATE_HISTORY}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${window.localStorage.getItem(USER_TOKEN)}`,
        },
      }
    )
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            throw new Error("Unexcept Action!");
        }
      })
      .then((data) => {
        setRateHistory(() => data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <NavigationBar />
      <Container>
        {rateHistory.map((data) => {
          return <RateHistory key={data.id} rid={data.id} />;
        })}
      </Container>
    </>
  );
};

export default RatesPage;
