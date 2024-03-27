import { createSlice } from "@reduxjs/toolkit";
import { USER_TOKEN } from "../model/UserModel.js";

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

export const RestaurantModalState = createSlice({
  name: "RestaurantModal",
  initialState: {
    show: false,
    restaurantInfo: {
      id: "loading",
      img: "https://placehold.co/600x400/?text=Image",
      name: "loading",
      desc: "loading",
    },
  },
  reducers: {
    showRestaurantInfo: (state, action) => {
      return {
        show: true,
        restaurantInfo: {
          ...action.payload,
        },
      };
    },
    hideRestaurnatInfo: (state) => {
      return {
        ...state,
        show: false,
      };
    },
  },
});

export const { showRestaurantInfo, hideRestaurnatInfo } =
  RestaurantModalState.actions;

export const RestaurantModalStateReducer = RestaurantModalState.reducer;

export const UserStateSlice = createSlice({
  name: "UserStateSlice",
  initialState: {
    login: window.localStorage.getItem(USER_TOKEN) === null ? false : true,
    selectRestaurant: {},
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

const MessageBoxStateSlice = createSlice({
  name: "MessageBoX",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({ ...action.payload, remove: false });
      return state;
    },
    removeMessage: (state, action) => {
      state.messages[action.payload] = {
        ...state.messages[action.payload],
        remove: true,
      };
      return state;
    },
    clearMessage: (state) => {
      state.messages = [];
      return state;
    },
    defaultMessage: (state) => {
      return state;
    },
  },
});

export const { addMessage, removeMessage, clearMessage, defaultMessage } =
  MessageBoxStateSlice.actions;
export const MessageBoxReducer = MessageBoxStateSlice.reducer;
