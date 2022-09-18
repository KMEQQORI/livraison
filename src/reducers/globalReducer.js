import {
  LOGOUT,
  REQUEST_USER_CHECK,
  SET_TOKEN,
  SET_LANGUAGE,
  SET_PROFILE,
  SET_PHONE_NUMBER,
  SET_CHECK_NUMBER,
  SET_REQUEST_ID,
} from "../actions/globalActions";

export const globalReducer = (
  state = {
    language: null,
    checkNumber: null,
    token: null,
    profile: null,
  },
  action
) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        token: null,
        profile: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_CHECK_NUMBER:
      return {
        ...state,
        checkNumber: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
