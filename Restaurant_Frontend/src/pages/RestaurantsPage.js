import React, { useEffect, useState } from "react";

import NavigationBar from "../componments/NavigationBar.js";
import Restaurant from "../componments/Restaurant.js";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import { BACKEND_SEVICE_ROOT, BACKEND_SERVICE_RESTAURANTS } from "../EnvVar.js";
import RestaurantDetail from "../componments/RestaurantDetail.js";
const RestaurantsPage = () => {
  const [restaurantsInfo, setRestaurantsInfo] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      `${BACKEND_SEVICE_ROOT}/${BACKEND_SERVICE_RESTAURANTS}?searchResaurant=${searchString}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRestaurantsInfo(() => data);
        setIsLoading(() => false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchString]);

  const restaurantsInfoView = isLoading
    ? Array(3)
        .fill(0)
        .map((v, i) => {
          return (
            <Col lg={4} key={i}>
              <Card>
                <Card.Img
                  variant="top"
                  height={300}
                  src="https://placehold.co/600x400?text=NoImage"
                />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                </Card.Body>
              </Card>
            </Col>
          );
        })
    : restaurantsInfo.map((restaurantInfo) => {
        if (!restaurantInfo.img) {
          restaurantInfo.img = "https://placehold.co/600x400?text=NoImage";
        }
        return (
          <Restaurant key={restaurantInfo.id} restaurantInfo={restaurantInfo} />
        );
      });
  return (
    <>
      <NavigationBar
        showSearchBar
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Container>
        <Row className="mt-2">{restaurantsInfoView}</Row>
      </Container>
      <RestaurantDetail />
    </>
  );
};

export default RestaurantsPage;
