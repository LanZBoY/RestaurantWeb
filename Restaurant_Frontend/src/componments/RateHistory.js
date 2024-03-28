import React, { useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

import PropTypes from "prop-types";
import { RateRestaurant } from "../utils.js";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/slice.js";

const RateHistory = ({ rateInfo }) => {
  const [newRating, setNewRating] = useState(rateInfo.rating);
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();

  const handleRange = (e) => {
    setNewRating(() => e.target.value);
    setHidden(() => false);
  };

  const handleReset = () => {
    setNewRating(() => rateInfo.rating);
    setHidden(() => true);
  };

  const handleApply = () => {
    RateRestaurant(rateInfo.id, newRating).then((res) => {
      switch (res.status) {
        case 200:
          setHidden(() => true);
          dispatch(
            addMessage({
              title: "修改成功！",
              message: `你以將${rateInfo.name}修改至${newRating}`,
              duration: 3000,
            })
          );
          break;
        default:
          throw new Error("Unexcept Action!");
      }
    });
  };

  return (
    <>
      <Row className="shadow mt-2">
        <Card>
          <Card.Body>
            <Row>
              <Col
                lg={3}
                className="d-inline-flex align-items-center justify-content-center"
              >
                <Card.Text>{rateInfo.name}</Card.Text>
              </Col>
              <Col
                lg={3}
                className="d-inline-flex align-items-center justify-content-center"
              >
                <Card.Text>{newRating}分</Card.Text>
              </Col>
              <Col lg={3}>
                <Form.Label>評分</Form.Label>
                <Form.Range
                  min={0}
                  max={5}
                  value={newRating}
                  step={0.01}
                  onChange={handleRange}
                ></Form.Range>
              </Col>
              <Col lg={3} className="d-flex justify-content-end">
                <Button
                  variant="success"
                  className="me-2"
                  hidden={hidden}
                  onClick={handleApply}
                >
                  應用
                </Button>
                <Button
                  variant="warning"
                  className="me-2"
                  hidden={hidden}
                  onClick={handleReset}
                >
                  重設
                </Button>
                <Button variant="danger" className="me-2">
                  刪除
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

RateHistory.propTypes = {
  rateInfo: PropTypes.object,
};

export default RateHistory;
