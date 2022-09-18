import React, { useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { margins } from "../../css/margins";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import I18n from "../../utils/i18n";
import emptyCartImage from "../../../assets/empty-cart.png";
import commandesImage from "../../../assets/commandes.png";

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
    textAlign: "center",
    padding: 50,
  },
  mainButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    margin: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainButtonText: {
    ...fonts.bigText,
    color: colors.primary,
    paddingHorizontal: 16,
  },
  megaIcon: {
    alignItems: "center",
  },
});

const EmptyCart = (props) => {
  const { dispatch, language, navigation } = props;
  useEffect(() => {}, [language]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{ width: 250, height: 250 }}
        resizeMethod="scale"
        source={emptyCartImage}
      />
      <Text style={styles.emptyStateText}>
        {I18n.t("cart.empty_cart.empty_state_text")}
      </Text>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("Commandes")}
      >
        <Image
          style={{ width: 32, height: 32 }}
          resizeMethod="scale"
          source={commandesImage}
        />
        <Text style={styles.mainButtonText}>
          {I18n.t("cart.empty_cart.orders_button")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { language } = globalReducer;
  return { language };
}

export default connect(mapStateToProps)(EmptyCart);
