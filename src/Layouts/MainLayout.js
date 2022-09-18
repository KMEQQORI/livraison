import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { retrieveLanguage, retrieveToken } from "../actions/globalActions";

import Store from "../features/store/Store";
import Commandes from "../features/Commandes/Commandes";
import CartConfirmation from "../features/cart/CartConfirmation";
import Services from "../features/services/Services";
import UserLocationEdit from "../features/profile/UserLocationEdit";

import TabNavigation from "./TabNavigation";
import Loader from "../features/comuns/Loader";
import I18n from "../utils/i18n";
import UserPhoneNumberEdit from "../features/profile/UserPhoneNumberEdit";
import Welcome from "../features/welcome/Welcome";
import Languages from "../features/languages/languages";
import UserInformationEdit from "../features/profile/UserInformationEdit";
import ErrorPage from "../features/comuns/ErrorPage";
const Stack = createStackNavigator();

const MainLayout = (props) => {
  const {
    dispatch,
    token,
    language,
    loader,
    connexionError,
    profile,
    isLocationReady,
    isPhoneNumberReady,
  } = props;
  useEffect(() => {
    dispatch(retrieveToken());
    dispatch(retrieveLanguage());
  }, [token, language]);

  return (
    <NavigationContainer headerMode="none">
      {!connexionError && (
        <Stack.Navigator>
          {!language && (
            <Stack.Screen
              name="Languages"
              component={Languages}
              options={{ headerShown: false }}
            />
          )}

          {(!isLocationReady || !isPhoneNumberReady) && (
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
          )}

          <Stack.Screen
            name="Services"
            component={Services}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false, title: I18n.t("titles.home") }}
          />
          <Stack.Screen
            name="Store"
            component={Store}
            options={{ title: I18n.t("titles.store") }}
          />
          <Stack.Screen
            name="Commandes"
            component={Commandes}
            options={{ title: I18n.t("titles.commande_list") }}
          />
          <Stack.Screen
            name="CartConfirmation"
            component={CartConfirmation}
            options={{ title: I18n.t("titles.confirmation_screen") }}
          />

          <Stack.Screen
            name="UserLocationEdit"
            component={UserLocationEdit}
            options={{ title: I18n.t("titles.user_location") }}
          />
          <Stack.Screen
            name="UserPhoneNumberEdit"
            component={UserPhoneNumberEdit}
            options={{ title: I18n.t("titles.user_phone_number") }}
          />
          <Stack.Screen
            name="UserInformationEdit"
            component={UserInformationEdit}
            options={{ title: I18n.t("titles.user_information") }}
          />
        </Stack.Navigator>
      )}
      {loader && <Loader />}
      {connexionError && <ErrorPage />}
    </NavigationContainer>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer, storesReducer } = state;
  const { token, language, profile } = globalReducer;
  const { loader, connexionError } = storesReducer;
  const isLocationReady =
    profile?.longitude &&
    profile?.longitude !== null &&
    profile?.latitude &&
    profile?.latitude !== null;
  const isPhoneNumberReady =
    profile?.phoneNumber && profile?.phoneNumber !== null;
  return {
    connexionError,
    token,
    language,
    loader,
    profile,
    isLocationReady,
    isPhoneNumberReady,
  };
}

export default connect(mapStateToProps)(MainLayout);
