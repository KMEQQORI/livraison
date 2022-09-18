import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { margins } from "../../css/margins";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import I18n from "../../utils/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    ...fonts.bigText,
    color: colors.gray,
    padding: 36,
    textAlign: "center",
  },
  mainButton: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    margin: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainButtonText: {
    ...fonts.bigText,
    color: colors.primary,
  },
});

const EmptyCommande = (props) => {
  const { dispatch, navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.megaIcon}>
        <AntDesign name="clockcircleo" size={300} color={colors.gray} />
      </Text>
      <Text style={styles.emptyStateText}>
        {I18n.t("order.empty_cart.empty_state_text")}
      </Text>
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(EmptyCommande);
