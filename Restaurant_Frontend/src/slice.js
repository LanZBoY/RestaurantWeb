import { createSlice } from "@reduxjs/toolkit";
import { USER_TOKEN } from "./model/UserModel.js";

export const ModalStateSlice = createSlice({
  name: "ModalStateSlice",
  initialState: {
    LoginModal: false,
    RegisterModal: false,
  },
  reducers: {
    showLoginModal: (state) => {
      return {
        ...state,
        LoginModal: true,
      };
    },
    hideLoginModal: (state) => {
      return {
        ...state,
        LoginModal: false,
      };
    },
    showRegisterModal: (state) => {
      return {
        ...state,
        RegisterModal: true,
      };
    },
    hideRegisterModal: (state) => {
      return {
        ...state,
        RegisterModal: false,
      };
    },
  },
});

export const {
  showLoginModal,
  hideLoginModal,
  showRegisterModal,
  hideRegisterModal,
} = ModalStateSlice.actions;
export const ModalReducer = ModalStateSlice.reducer;

export const UserStateSlice = createSlice({
  name: "UserStateSlice",
  initialState: {
    login: window.localStorage.getItem(USER_TOKEN) === null ? false : true,
  },
  reducers: {
    changeLoginState: (state) => {
      return {
        ...state,
        login: window.localStorage.getItem(USER_TOKEN) === null ? false : true,
      };
    },
  },
});

export const { changeLoginState } = UserStateSlice.actions;
export const UserStateReducer = UserStateSlice.reducer;
