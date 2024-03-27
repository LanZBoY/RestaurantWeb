import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage.js";
import RestaurantsPage from "./pages/RestaurantsPage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import RatesPage from "./pages/RatesPage.js";
import MessageBox from "./componments/MessageBox.js";
import { Provider } from "react-redux";
import store from "./store/store.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/restaurants",
    element: <RestaurantsPage />,
  },
  {
    path: "/rates",
    element: <RatesPage />,
  },
]);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <MessageBox />
    </Provider>
  </StrictMode>
);
