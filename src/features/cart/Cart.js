import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CartProductListItem from "../cart/CartProductListItem";
import { margins } from "../../css/margins";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import EmptyCart from "./EmptyCart";
import { MaterialIcons } from "@expo/vector-icons";
import { RESET_CART } from "../../actions/storesActions";
import { retrieveLanguage } from "../../actions/globalActions";
import I18n from "../../utils/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    ...margins.noBarMargin,
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
    borderRadius: 16,
  },
  storeInfo: {
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  storeName: {
    ...fonts.text,
    marginTop: 12,
  },
  total: {
    backgroundColor: "white",
    padding: 16,
    elevation: 1,
  },
  cancelContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: colors.backgroundGray,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  cancelButton: {
    ...fonts.text,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.error,
    padding: 8,
    width: 100,
    textAlign: "center",
    borderRadius: 16,
  },
  cancelText: {
    ...fonts.text,
    color: colors.white,
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
    backgroundColor: colors.secondary,
    justifyContent: "center",
    paddingVertical: 16,
    elevation: 1,
  },
  commanderButtonText: {
    ...fonts.bigChoice,
    color: "white",
  },
});

const Cart = (props) => {
  const { dispatch, navigation, language, cart, totalPrice } = props;

  useEffect(() => {}, [language]);

  const cancelAction = () => {
    Alert.alert(
      "Annuler le panier",
      "etes vous sur de vouloir se annuler votre panier ?",
      [
        {
          text: "non",
          style: "cancel",
        },
        {
          text: "oui",
          onPress: () => {
            dispatch({ type: RESET_CART });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return cart.length > 0 ? (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <CartProductListItem
                item={item}
                handleSelectProduct={() => null}
              />
            )}
            keyExtractor={(item) => item.product.id}
          ></FlatList>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity
            onPress={() => {
              cancelAction();
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>
              {I18n.t("cart.cancel_button")}{" "}
            </Text>
            <MaterialIcons name="cancel" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalCommande}>
            {I18n.t("cart.total_order")} :
            <Text style={styles.totalPrice}>
              {" "}
              {totalPrice} {I18n.t("money")}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CartConfirmation");
          }}
        >
          <View style={styles.commanderButton}>
            <Text style={styles.commanderButtonText}>
              {I18n.t("cart.validate_button")}
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  ) : (
    <EmptyCart navigation={navigation} />
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer, globalReducer } = state;
  const { cart, store } = storesReducer;
  const totalPrice = cart.length
    ? cart.reduce((accumulator, item) => {
        return (
          parseFloat(accumulator) +
          parseFloat(item.product?.price) * parseFloat(item.amount)
        );
      }, 0)
    : 0;
  const { language } = globalReducer;
  return { cart, totalPrice, language };
}

export default connect(mapStateToProps)(Cart);
