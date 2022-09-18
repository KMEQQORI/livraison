import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { colors } from "../../css/colors";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    elevation: 100,
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
