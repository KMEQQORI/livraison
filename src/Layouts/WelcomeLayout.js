import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Languages from "../features/languages/languages";
import { connect } from "react-redux";
import { retrieveLanguage } from "../actions/globalActions";
import Welcome from "../features/welcome/Welcome";

const Stack = createStackNavigator();

const WelcomeLayout = (props) => {
  const { language, dispatch } = props;

  useEffect(() => {
    dispatch(retrieveLanguage());
  }, [language]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Languages"
        component={Languages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { language } = globalReducer;

  return { language };
}

export default connect(mapStateToProps)(WelcomeLayout);
