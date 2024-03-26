import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Toast,
} from "react-bootstrap";
import PropTypes from "prop-types";
import {
  BACKEND_SERVICE_RATE,
  BACKEND_SERVICE_USER,
  BACKEND_SEVICE_ROOT,
} from "../EnvVar.js";
import { USER_TOKEN } from "../model/UserModel.js";
const Restaurant = ({
  restaurantInfo = {
    id: "loading",
    img: "https://placehold.co/600x400/?text=Image",
    name: "loading",
    desc: "loading",
  },
}) => {
  const [rating, setRating] = useState(2.5);
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const showDetailInfo = () => {
    setModalShow((prev) => !prev);
  };

  const handleOnRatingEvent = () => {
    // fetch(
    //   `${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_USER}/${BACKEND_SERVICE_RATE}/${restaurantInfo.id}/${rating}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${window.localStorage.getItem(USER_TOKEN)}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((res) => {
    //     switch (res.status) {
    //       case 200:
    //         return res.text();
    //       case 201:
    //         return res.json();
    //       default:
    //         throw Error("Unexpeted Action!");
    //     }
    //   })
    //   .then(() => {
    //     setIsShow((prev) => !prev);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    const promise = new Promise((resolve) => {
      resolve(`your rating is ${rating}`);
    });
    promise.then((value) => {
      console.log(value);
      setModalShow((prev) => !prev);
      setToastShow(() => true);
    });
  };
  return (
    <>
      <Col lg={4} className="mt-3">
        <Card onClick={showDetailInfo}>
          <Card.Img
            height={300}
            src={
              restaurantInfo.img
                ? `${process.env.BACKEND_SERVICE_ROOT}/${process.env.BACKEND_SERVICE_RESTAURANTS}/${process.env.BACKEND_SERVICE_IMAGES}/${restaurantInfo.img}`
                : "https://placehold.co/600x400?text=NoImage"
            }
          ></Card.Img>
          <Card.Body>
            <Card.Title>{restaurantInfo.name}</Card.Title>
            <Card.Text>{restaurantInfo.desc}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={modalShow} onHide={showDetailInfo} size="lg">
        <Modal.Header closeButton>{restaurantInfo.name}</Modal.Header>
        <Modal.Body>{restaurantInfo.desc}</Modal.Body>
        <Modal.Footer>
          <InputGroup className="d-flex justify-content-center">
            <Form.Label>喜歡程度</Form.Label>
            <Form.Range
              min={0}
              max={5}
              step={0.05}
              value={rating}
              onChange={(e) => {
                setRating(() => {
                  return e.target.value;
                });
              }}
            />
          </InputGroup>
          <Button variant="success" onClick={handleOnRatingEvent}>
            評分
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Restaurant.propTypes = {
  restaurantInfo: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default Restaurant;
