import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const Restaurant = ({
  restaurantInfo = {
    id: "loading",
    img: "https://placehold.co/600x400/?text=Image",
    name: "loading",
    desc: "loading",
  },
}) => {
  const [rating, setRating] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const showDetailInfo = () => {
    setIsShow((prev) => !prev);
  };

  const handleOnRatingEvent = () => {
    console.log(`your rating is ${rating}`);
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
      <Modal show={isShow} onHide={showDetailInfo} size="lg">
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
