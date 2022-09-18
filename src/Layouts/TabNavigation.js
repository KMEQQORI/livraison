import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Profile from "../features/profile/profile";
import Cart from "../features/cart/Cart";
import Home from "../features/home/Home";
import userImage from "../../assets/user.png";
import cartImage from "../../assets/cart.png";
import storesImage from "../../assets/stores.png";

import { colors } from "../css/colors";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigation = (props) => {
  const { cartCount } = props;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Marché") {
            return (
              <Image
                style={{ width: 42, height: 42 }}
                resizeMethod="scale"
                source={storesImage}
              />
            );
          } else if (route.name === "Panier") {
            return (
              <Image
                style={{ width: 42, height: 42 }}
                resizeMethod="scale"
                source={cartImage}
              />
            );
          } else if (route.name === "User") {
            return (
              <Image
                style={{ width: 42, height: 42 }}
                resizeMethod="scale"
                source={userImage}
              />
            );
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={42} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: colors.backgroundSecondary,
        activeTintColor: colors.lightSecondary,
        inactiveTintColor: colors.secondary,
        tabStyle: {
          borderRadius: 50,
        },
      }}
    >
      <Tab.Screen name="Marché" component={Home} />
      <Tab.Screen
        name="Panier"
        component={Cart}
        options={{
          tabBarBadge: cartCount,
          tabBarBadgeStyle: { backgroundColor: colors.info },
        }}
      />
      <Tab.Screen name="User" component={Profile} />
    </Tab.Navigator>
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer } = state;
  const { cart } = storesReducer;
  const cartCount = cart.length;
  return { cartCount };
}

export default connect(mapStateToProps)(TabNavigation);
