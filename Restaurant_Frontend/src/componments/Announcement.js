import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const Announcement = () => {
  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <Col>
          <Card>
            <Card.Header className="fs-3 fw-bold text-center text-lg-center">
              最新消息
            </Card.Header>
            <Card.Body className="mb-3">
              <Card.Img
                src="https://placehold.co/600x200/?text=Image"
                className="mb-3"
              ></Card.Img>
              <Card.Title className="fs-4 mb-3">全新評餐廳來囉！</Card.Title>
              <Card.Text className="fs-5 mb-3">功能尚未完成</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {new Date().toLocaleString()}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Announcement;
