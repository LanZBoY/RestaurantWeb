import React, { useEffect, useState } from "react";

import NavigationBar from "../componments/NavigationBar.js";
import Restaurant from "../componments/Restaurant.js";
import { Container, Row } from "react-bootstrap";
const RestaurantsPage = () => {
  const [restaurantsInfo, setRestaurantsInfo] = useState([]);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    fetch(
      `${process.env.BACKEND_SERVICE_ROOT}/${process.env.BACKEND_SERVICE_RESTAURANTS}?searchResaurant=${searchString}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRestaurantsInfo(() => data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchString]);
  return (
    <>
      <NavigationBar
        setInfoList={setRestaurantsInfo}
        showSearchBar
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Container>
        <Row className="mt-2">
          {restaurantsInfo.map((restaurantInfo) => {
            if (!restaurantInfo.img) {
              restaurantInfo.img = "https://placehold.co/600x400?text=NoImage";
            }
            return (
              <Restaurant
                key={restaurantInfo.id}
                restaurantInfo={restaurantInfo}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default RestaurantsPage;
