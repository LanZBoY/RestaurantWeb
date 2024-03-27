import React, { useEffect, useState } from "react";
import NavigationBar from "../componments/NavigationBar.js";
import { Container, Row, Col, Card, Button, InputGroup } from "react-bootstrap";
import {
  BACKEND_SEVICE_ROOT,
  BACKEND_SERVICE_USER,
  BACKEND_SERVICE_RATE_HISTORY,
} from "../EnvVar.js";
import { USER_TOKEN } from "../model/UserModel.js";

const RatesPage = () => {
  const [rateHistory, setRateHistory] = useState([]);
  useEffect(() => {
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
  console.log(rateHistory);
  return (
    <>
      <NavigationBar />
      <Container>
        {rateHistory.map((item) => {
          console.log(item);
          return (
            <>
              <Row>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col lg={3}>
                        <Card.Text>{item.name}</Card.Text>
                      </Col>
                      <Col lg={3}>
                        <Card.Text>{item.rating}分</Card.Text>
                      </Col>
                      <Col lg={6}>
                        <InputGroup className="justify-content-end">
                          <Button variant="success">修改</Button>
                          <Button variant="danger">刪除</Button>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default RatesPage;
