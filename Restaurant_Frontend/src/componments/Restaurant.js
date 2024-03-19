import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import PropTypes from "prop-types";

const Restaurant = ({
  restaurantInfo = {
    id: "rId",
    img: "https://placehold.co/600x400/?text=Image",
    name: "RestaurantName",
    desc: "RestaurnatDesc",
  },
}) => {
  const [isShow, setIsShow] = useState(false);
  const showDetailInfo = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <>
      <Col lg={4} className="mt-3">
        <Card onClick={showDetailInfo}>
          <Card.Img
            variant="top"
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
          <InputGroup className="d-flex justify-content-end">
            <Button variant="success">評論</Button>
          </InputGroup>
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
