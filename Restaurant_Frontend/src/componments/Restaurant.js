import React from "react";
import { Card, Col, Fade } from "react-bootstrap";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { showRestaurantInfo } from "../store/slice.js";
const Restaurant = ({
  restaurantInfo = {
    id: "loading",
    img: "https://placehold.co/600x400/?text=Image",
    name: "loading",
    desc: "loading",
  },
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Col lg={4} className="mt-3">
        <Card
          onClick={() => {
            dispatch(showRestaurantInfo(restaurantInfo));
          }}
        >
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
    </>
  );
};

Restaurant.propTypes = {
  restaurantInfo: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default Restaurant;
