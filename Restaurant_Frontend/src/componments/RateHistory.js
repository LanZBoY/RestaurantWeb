import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

import PropTypes from "prop-types";
import { getRateInfo, rateRestaurant } from "../utils.js";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/slice.js";

const RateHistory = ({ rid }) => {
  const [rateInfo, setRateInfo] = useState(() => {
    return { name: "", rating: 0.0 };
  });
  const [preRating, setPreRating] = useState(2.5);
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getRateInfo(rid)
      .then((res) => {
        return res.json();
      })
      .then((fetchRateInfo) => {
        setRateInfo(() => fetchRateInfo);
        setPreRating(() => fetchRateInfo.rating);
      });
  }, []);

  const handleRange = (e) => {
    setPreRating(() => e.target.value);
    setHidden(() => false);
  };

  const handleReset = () => {
    setPreRating(() => rateInfo.rating);
    setHidden(() => true);
  };

  const handleApply = () => {
    rateRestaurant(rid, preRating).then((res) => {
      switch (res.status) {
        case 200:
          setHidden(() => true);
          setRateInfo(() => {
            return {
              ...rateInfo,
              rating: preRating,
            };
          });
          dispatch(
            addMessage({
              title: "修改成功！",
              message: `你以將${rateInfo.name}修改至${preRating}分`,
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
                <Card.Text>
                  {rateInfo.rating}分
                  {rateInfo.rating == preRating ? "" : ` -> ${preRating}分`}
                </Card.Text>
              </Col>
              <Col lg={3}>
                <Form.Label>評分</Form.Label>
                <Form.Range
                  min={0}
                  max={5}
                  value={preRating}
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
  rid: PropTypes.string,
};

export default RateHistory;
