import { configureStore } from "@reduxjs/toolkit";
import {
  ModalReducer,
  UserStateReducer,
  RestaurantModalStateReducer,
  MessageBoxReducer,
} from "./slice.js";
export default configureStore({
  reducer: {
    ModalState: ModalReducer,
    UserState: UserStateReducer,
    RestaurantModalState: RestaurantModalStateReducer,
    MessageBoxState: MessageBoxReducer,
  },
});
