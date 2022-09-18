import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";

axios.defaults.baseURL = `${API_URL}/api`;

const apiRequest = axios.create();

apiRequest.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    alert("error", error);
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error

    throw error;
  }
);

export default apiRequest;
