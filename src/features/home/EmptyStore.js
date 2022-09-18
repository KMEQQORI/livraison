import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { margins } from "../../css/margins";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import I18n from "../../utils/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    ...margins.noBarMargin,
  },
  mainContainer: {
    padding: 48,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
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
    borderRadius: 16,
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

const EmptyStore = (props) => {
  const { dispatch, navigation } = props;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.megaIcon}>
        <Entypo name="emoji-sad" size={200} color={colors.primary} />
      </Text>
      <Text style={styles.emptyStateText}>
        {I18n.t("home_page.empty_store")}
      </Text>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(EmptyStore);
