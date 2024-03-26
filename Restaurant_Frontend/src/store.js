import { configureStore } from "@reduxjs/toolkit";
import { ModalReducer, UserStateReducer } from "./slice.js";
export default configureStore({
  reducer: {
    ModalState: ModalReducer,
    UserState: UserStateReducer,
  },
});
