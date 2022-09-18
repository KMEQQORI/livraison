import {
  SET_SERVICE,
  SET_SERVICES,
  SET_STORES,
  SET_STORE,
  SET_PRODUCT,
  SET_SELECTEDTAGS,
  ADD_PRODUCT_TO_CART,
  SET_ADS,
  RESET_SERVICE_CONTENT,
  SET_CART_STORE,
  SET_CART,
  SET_COMMANDES,
  LOADING,
  STOP_LOADING,
  RESET_CART,
  SET_ERROR,
} from "../actions/storesActions";

export const storesReducer = (
  state = {
    service: null,
    services: [],
    store: null,
    stores: [],
    ads: [],
    product: null,
    selectedTags: [],
    cart: [],
    cartStore: null,
    commandes: [],
    loader: false,
    connexionError: false,
  },
  action
) => {
  switch (action.type) {
    case SET_ADS:
      return {
        ...state,
        ads: [...action.payload],
      };
    case SET_SERVICES:
      return {
        ...state,
        services: [...action.payload],
      };
    case SET_SERVICE:
      return {
        ...state,
        service: action.payload,
      };
    case SET_STORES:
      return {
        ...state,
        stores: [...action.payload],
      };

    case SET_STORE:
      return {
        ...state,
        store: action.payload,
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case SET_SELECTEDTAGS:
      return {
        ...state,
        selectedTags: [...action.payload],
      };

    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: [...action.payload],
      };

    case SET_CART_STORE:
      return {
        ...state,
        cartStore: action.payload,
      };

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case SET_COMMANDES:
      return {
        ...state,
        commandes: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loader: true,
      };

    case STOP_LOADING:
      return {
        ...state,
        loader: false,
      };

    case RESET_SERVICE_CONTENT:
      return {
        ...state,
        selectedTags: [],
        ads: [],
        store: null,
        product: null,
        stores: null,
        cart: [],
      };

    case RESET_CART:
      return {
        ...state,
        cart: [],
        cartStore: null,
        product: null,
      };

    case SET_ERROR:
      return {
        ...state,
        connexionError: action.payload,
      };

    default:
      return state;
  }
};
