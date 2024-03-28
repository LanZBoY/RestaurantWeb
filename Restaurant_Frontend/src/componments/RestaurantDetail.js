import React, { useRef } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  hideRestaurnatInfo,
  addMessage,
  showLoginModal,
} from "../store/slice.js";
import { USER_TOKEN } from "../model/UserModel.js";
import {
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_RATE,
  BACKEND_SERVICE_USER,
} from "../EnvVar.js";
import { UnloginMessage } from "../utils.js";
const RestaurantDetail = () => {
  const ratingRef = useRef(2.5);
  const modalState = useSelector((state) => state.RestaurantModalState.show);
  const restaurantInfo = useSelector(
    (state) => state.RestaurantModalState.restaurantInfo
  );
  const dispatch = useDispatch();
  const handleOnRatingEvent = () => {
    const rating = ratingRef.current.value;
    if (!window.localStorage.getItem(USER_TOKEN)) {
      dispatch(showLoginModal());
      dispatch(addMessage(UnloginMessage));
      return;
    }
    fetch(
      `${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USER}/${BACKEND_SERVICE_RATE}/${restaurantInfo.id}/${rating}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(USER_TOKEN)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        switch (res.status) {
          case 200:
            return { status: res.status, content: res.text() };
          case 201:
            return { status: res.status, content: res.json() };
          default:
            throw Error("Unexpeted Action!");
        }
      })
      .then((result) => {
        switch (result.status) {
          case 200:
            dispatch(
              addMessage({
                title: "已修改評分",
                message: `已修改對${restaurantInfo.name}的評分，至${rating}分`,
                duration: 5000,
              })
            );
            break;
          case 201:
            dispatch(
              addMessage({
                title: "已新增評分",
                message: `對${restaurantInfo.name}為${rating}分`,
                duration: 5000,
              })
            );
            break;
          default:
            dispatch(
              addMessage({
                title: "錯誤",
                message: `發生例外錯誤`,
                duration: 5000,
              })
            );
            break;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(hideRestaurnatInfo());
  };

  return (
    <Modal
      show={modalState}
      onHide={() => dispatch(hideRestaurnatInfo())}
      size="lg"
    >
      <Modal.Header closeButton>{restaurantInfo.name}</Modal.Header>
      <Modal.Body>{restaurantInfo.desc}</Modal.Body>
      <Modal.Footer>
        <InputGroup className="d-flex justify-content-center">
          <Form.Label>喜歡程度</Form.Label>
          <Form.Range ref={ratingRef} min={0} max={5} step={0.01} />
        </InputGroup>
        <Button variant="success" onClick={handleOnRatingEvent}>
          評分
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestaurantDetail;
