import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import EmptyCart from "./EmptyCart";
import { refreshCartStore, sendOrder } from "../../actions/storesActions";
import I18n from "../../utils/i18n";
import UserPhoneNumber from "../profile/UserPhoneNumber";
import UserLocation from "../profile/UserLocation";
import UserInformation from "../profile/UserInformation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flex: 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    zIndex: 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  storeImage: {
    height: 200,
    borderRadius: 2,
  },
  storeInfo: {
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  storeName: {
    ...fonts.text,
    marginTop: 12,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 6,
    flexWrap: "wrap",
  },
  tag: {
    color: "white",
    backgroundColor: colors.info,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 5,
  },
  total: {
    backgroundColor: "white",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  price: {
    margin: 16,
    ...fonts.small,
    color: colors.primary,
  },
  totalCommande: {
    ...fonts.bigText,
    color: colors.primary,
  },
  totalPrice: {
    ...fonts.bigChoice,
    color: colors.secondary,
  },
  commanderButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.info,
    justifyContent: "center",
    paddingVertical: 16,
  },
  commanderButtonText: {
    ...fonts.bigChoice,
    color: "white",
  },
  wrongProfileContainer: {
    padding: 16,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  wrongProfileAlertText: {
    ...fonts.small,
    color: colors.error,
  },
});

const CartConfirmation = (props) => {
  const {
    cart,
    dispatch,
    navigation,
    totalPrice,
    storeDelivryFees,
    latitude,
    totalDeliveryPrice,
    isReadyForDelivery,
  } = props;

  const handleSendOrder = () => {
    dispatch(sendOrder());
    navigation.navigate("Commandes");
  };

  useEffect(() => {
    dispatch(refreshCartStore());
  }, [isReadyForDelivery, latitude]);

  return cart.length > 0 ? (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {!isReadyForDelivery && (
            <View style={styles.wrongProfileContainer}>
              <Text style={styles.wrongProfileAlertText}>
                {I18n.t("alerts.confirm_cart_page.wrong_profile_alert")}
              </Text>
            </View>
          )}
          <UserInformation navigation={navigation} />
          <UserPhoneNumber navigation={navigation} />
          <UserLocation navigation={navigation} />
        </ScrollView>

        {isReadyForDelivery && (
          <>
            <View style={styles.total}>
              <Text style={styles.totalAchat}>
                {I18n.t("confirmation_cart.total_order")} :{" "}
                <Text style={styles.price}>
                  {totalPrice} {I18n.t("money")}
                </Text>
              </Text>
              <Text style={styles.totallivraison}>
                {I18n.t("confirmation_cart.delivree_fees")} :{" "}
                <Text style={styles.price}>
                  {storeDelivryFees} {I18n.t("money")}
                </Text>
              </Text>
              <Text style={styles.totalCommande}>
                {I18n.t("confirmation_cart.total")} :{" "}
                <Text style={styles.totalPrice}>
                  {totalDeliveryPrice} {I18n.t("money")}
                </Text>
              </Text>
            </View>
            <TouchableOpacity onPress={handleSendOrder}>
              <View style={styles.commanderButton}>
                <Text style={styles.commanderButtonText}>
                  {I18n.t("confirmation_cart.validate_button")}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </>
  ) : (
    <EmptyCart navigation={navigation} />
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer, globalReducer } = state;
  const { cart, store } = storesReducer;
  const storeDelivryFees = store.delivreeFees;
  const { profile } = globalReducer;
  const totalPrice = cart.length
    ? cart.reduce((accumulator, item) => {
        return (
          parseFloat(accumulator) +
          parseFloat(item.product.price) * parseFloat(item.amount)
        );
      }, 0)
    : 0;
  const isReadyForDelivery =
    profile?.phoneNumber &&
    profile?.latitude &&
    profile?.longitude &&
    profile.name;

  const totalDeliveryPrice = (parseFloat(totalPrice) + parseFloat(storeDelivryFees)).toFixed(2);
  return {
    cart,
    totalPrice,
    storeDelivryFees,
    latitude: profile?.latitude,
    isReadyForDelivery,
    totalDeliveryPrice,
  };
}

export default connect(mapStateToProps)(CartConfirmation);
