import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../features/login/LogIn";
import PhoneNumberCheck from "../features/login/PhoneNumberCheck";
import loader from "../features/comuns/Loader";
import Languages from "../features/languages/languages";
import { connect } from "react-redux";
import { retrieveLanguage } from "../actions/globalActions";

const Stack = createStackNavigator();

const LoginLayout = (props) => {
  const { language, dispatch, token, profile } = props;

  useEffect(() => {
    dispatch(retrieveLanguage());
  }, [language, profile, token]);

  return (
    <Stack.Navigator>
      {language && (
        <Stack.Screen
          name="Languages"
          component={Languages}
          options={{ headerShown: false }}
        />
      )}
      {(language === "fr" || language === "ar") && (
        <>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PhoneNumberCheck" component={PhoneNumberCheck} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="mainLoader"
            component={loader}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { language, profile, token } = globalReducer;

  return { language, profile, token };
}

export default connect(mapStateToProps)(LoginLayout);
