import React from "react";
import { Button, Card, Col, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const Restaurant = ({
  restaurantInfo = {
    id: "rId",
    img: "https://placehold.co/600x400/?text=Image",
    name: "RestaurantName",
    desc: "RestaurnatDesc",
  },
}) => {
  return (
    <Col lg={4} className="mt-3">
      <Card>
        <Card.Img
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
        <Card.Footer>
          <InputGroup className="d-flex justify-content-end">
            <Button variant="primary">詳細資訊</Button>
            <Button variant="success">評分</Button>
          </InputGroup>
        </Card.Footer>
      </Card>
    </Col>
  );
};

Restaurant.propTypes = {
  restaurantInfo: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default Restaurant;
