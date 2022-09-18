import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import apiRequest from "../utils/axios";
import jwt_decode from "jwt-decode";
import i18n from "../utils/i18n";

export const LOGOUT = "LOGOUT";
export const REQUEST_USER_CHECK = "REQUEST_USER_CHECK";
export const SET_TOKEN = "SET_TOKEN";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_PROFILE = "SET_PROFILE";
export const SET_PHONE_NUMBER = "SET_PHONE_NUMBER";
export const SET_CHECK_NUMBER = "SET_CHECK_NUMBER";
export const SET_REQUEST_ID = "SET_REQUEST_ID";

export const logOut = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("language");
  dispatch({ type: LOGOUT });
  dispatch(createNewUser());
};

export const createNewUser = () => async (dispatch) => {
  const response = axios
    .get(`${API_URL}/api/createNewUser`)
    .then(async (response) => {
      if (response.status === 200) {
        const token = response.data;
        await AsyncStorage.setItem("token", token);
        dispatch(retrieveToken());
      } else {
        Alert("error creating new user");
      }
    })
    .catch((error) => {
      Alert("error creating new user");
    });
};

export const retrieveLanguage = () => async (dispatch) => {
  const language = await AsyncStorage.getItem("language");
  if (language === "fr" || language === "ar") {
    i18n.locale = language;
    dispatch({ type: SET_LANGUAGE, payload: language });
  }
};

export const retrieveToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (token !== null) {
    const decodedToken = jwt_decode(token);
    dispatch({ type: SET_TOKEN, payload: token });
    dispatch({ type: SET_PROFILE, payload: decodedToken });
  } else {
  }
};

export const setLanguage = (chosenLanguage) => async (dispatch) => {
  await AsyncStorage.setItem("language", chosenLanguage);
  i18n.locale = chosenLanguage;
  return dispatch({ type: SET_LANGUAGE, payload: chosenLanguage });
};

export const updatePhoneNumber = (phoneNumber) => async (dispatch) => {
  const internationalPhoneNumber = `212${phoneNumber
    .replace(/ +/g, "")
    .substr(1)}`;
  dispatch({
    type: SET_PHONE_NUMBER,
    payload: "+" + internationalPhoneNumber,
  });
  try {
    const response = await apiRequest.get(
      `/update/phone/${internationalPhoneNumber}`
    );
    if (response.status === 200) {
      const token = response.data;
      await AsyncStorage.setItem("token", token);
      dispatch(retrieveToken());
    }
  } catch (error) {}
};

export const updateProfile =
  (newProfileInformation) => async (dispatch, getState) => {
    const oldProfile = getState().globalReducer.profile;
    const body = {
      ...oldProfile,
      ...newProfileInformation,
    };

    const response = await apiRequest
      .put(`/user/profile`, body)
      .then(async (response) => {
        if (response.status === 200) {
          const token = response.data;
          await AsyncStorage.setItem("token", token);
          dispatch(retrieveToken());
        } else {
          return dispatch({
            type: "SET_PROFILE",
            payload: null,
          });
        }
      });
  };
