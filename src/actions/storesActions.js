import apiRequest from "../utils/axios";

export const SET_SERVICES = "SET_SERVICES";
export const SET_SERVICE = "SET_SERVICE";
export const SET_STORES = "SET_STORES";
export const SET_STORE = "SET_STORE";
export const SET_SELECTEDTAGS = "SET_SELECTEDTAGS";
export const SET_PRODUCT = "SET_PRODUCT";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const SET_ADS = "SET_ADS";
export const RESET_SERVICE_CONTENT = "RESET_SERVICE_CONTENT";
export const SET_CART_STORE = "SET_CART_STORE";
export const SET_CART = "SET_CART";
export const SET_COMMANDES = "SET_COMMANDES";
export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const RESET_CART = "RESET_CART";
export const SET_ERROR = "SET_ERROR";

export const resetServiceContent = () => (dispatch) => {
  return dispatch({
    type: RESET_SERVICE_CONTENT,
  });
};

export const setService = (service) => (dispatch) => {
  dispatch(resetServiceContent());
  return dispatch({
    type: SET_SERVICE,
    payload: service,
  });
};

export const setProduct = (product) => (dispatch) => {
  return dispatch({
    type: SET_PRODUCT,
    payload: product,
  });
};

export const setCartStore = (store) => (dispatch) => {
  return dispatch({
    type: SET_CART_STORE,
    payload: store,
  });
};

export const refreshCartStore = () => (dispatch, getState) => {
  const selectedStore = getState().storesReducer.store;
  return dispatch(retrieveStore(selectedStore));
};

export const setCart = (store) => (dispatch) => {
  return dispatch({
    type: SET_CART,
    payload: store,
  });
};

export const setError = (setup) => (dispatch) => {
  return dispatch({
    type: SET_ERROR,
    payload: setup,
  });
};

export const addProductToCart =
  (product, amount, comment) => (dispatch, getState) => {
    const { cart } = getState().storesReducer;
    const isExist = cart.find(
      (cartProduct) => cartProduct.product.id === product.id
    );
    if (!isExist) {
      return dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: [
          ...cart,
          {
            product,
            amount,
            comment,
          },
        ],
      });
    } else {
      return dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: [
          ...cart.filter(
            (cartProduct) => cartProduct.product.id !== product.id
          ),
          {
            product,
            amount,
          },
        ],
      });
    }
  };

export const selectTag = (tag) => (dispatch, getState) => {
  const selectedTags = getState().storesReducer.selectedTags;
  if (!selectedTags.find((selectedTag) => selectedTag.id === tag.id)) {
    return dispatch({
      type: SET_SELECTEDTAGS,
      payload: [tag],
    });
  } else {
    return dispatch({
      type: SET_SELECTEDTAGS,
      payload: [],
    });
  }
};

export const retrieveStores = (service) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    let tagIds = "";
    service?.tags.forEach((tag) => {
      tagIds = tagIds.concat(`${tag.id};`);
    });
    if (tagIds !== "") {
      const response = await apiRequest.get(`/stores/tag/${tagIds}`);
      dispatch({
        type: STOP_LOADING,
      });
      if (response.status === 200) {
        const stores = response.data;
        return dispatch({
          type: SET_STORES,
          payload: stores,
        });
      }
      return dispatch({
        type: SET_STORES,
        payload: [],
      });
      return dispatch({
        type: SET_ERROR,
        payload: true,
      });
    } else {
      dispatch({
        type: STOP_LOADING,
      });
    }
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const retrieveAds = (service) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    let tagIds = "";
    service?.tags.forEach((tag) => {
      tagIds = tagIds.concat(`${tag.id};`);
    });
    if (tagIds !== "") {
      const response = await apiRequest.get(`/ads/tag/${tagIds}`);
      dispatch({
        type: STOP_LOADING,
      });
      if (response.status === 200) {
        const ads = response.data;
        return dispatch({
          type: SET_ADS,
          payload: ads,
        });
      }
      return dispatch({
        type: SET_ADS,
        payload: [],
      });
      return dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const retrieveStore = (selectedStore) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const response = await apiRequest.get(`/stores/${selectedStore.id}`);
    dispatch({
      type: STOP_LOADING,
    });
    if (response.status === 200) {
      const store = response.data;
      return dispatch({
        type: SET_STORE,
        payload: store,
      });
    }
    return dispatch({
      type: SET_STORE,
      payload: null,
    });
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const sendOrder = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    });
    const { cart, cartStore } = getState().storesReducer;
    const { profile } = getState().globalReducer;
    const body = {
      cart,
      store: cartStore,
      user: profile,
      delivreeFees: cartStore.delivreeFees,
    };
    const response = await apiRequest.post(`/commandes`, body);
    dispatch({
      type: STOP_LOADING,
    });
    if (response.status === 200) {
      const commandes = response.data;
      dispatch({
        type: RESET_CART,
      });
      return dispatch({
        type: SET_COMMANDES,
        payload: commandes,
      });
    }
    return dispatch({
      type: SET_COMMANDES,
      payload: [],
    });
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const cancelOrder = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    });
    const response = await apiRequest.put(`/commandes/${item.id}/cancel`);
    dispatch({
      type: STOP_LOADING,
    });
    if (response.status === 200) {
      const commandes = response.data;
      dispatch({
        type: RESET_CART,
      });
      return dispatch({
        type: SET_COMMANDES,
        payload: commandes,
      });
    }
    return dispatch({
      type: SET_COMMANDES,
      payload: [],
    });
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const retreiveCommandes = () => async (dispatch) => {
  try {
    const response = await apiRequest.get(`/commandes`);
    if (response.status === 200) {
      const commandes = response.data;
      return dispatch({
        type: SET_COMMANDES,
        payload: commandes,
      });
    }
    return dispatch({
      type: SET_COMMANDES,
      payload: [],
    });
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const retrieveServices = () => async (dispatch) => {
  try {
    const response = await apiRequest.get(`/services`);
    if (response.status === 200) {
      const services = response.data;

      return dispatch({
        type: SET_SERVICES,
        payload: services,
      });
    }
    return dispatch({
      type: SET_SERVICES,
      payload: [],
    });
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  } catch (e) {
    return dispatch({
      type: SET_ERROR,
      payload: true,
    });
  }
};

export const resetCart = () => (dispatch) => {
  dispatch({
    type: SET_CART_STORE,
    payload: null,
  });
  return dispatch({
    type: SET_CART,
    payload: [],
  });
};
