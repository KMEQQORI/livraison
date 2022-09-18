import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { API_URL } from "@env";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import moment from "moment";
import CommandeStatus from "./CommandeStatus";
import CommandeProductListItem from "./CommandeProductListItem";
import { cancelOrder, RESET_CART } from "../../actions/storesActions";
import { connect } from "react-redux";
import I18n from "../../utils/i18n";
import { isArabe } from "../../utils/languageUtils";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 16,
    width: "96%",
    marginHorizontal: "2%",
    backgroundColor: colors.white,
  },
  image: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    minHeight: 150,
  },
  disabledShadow: {
    position: "absolute",
    opacity: 0.5,
    borderRadius: 8,
  },
  blackBackground: {
    backgroundColor: "black",
    borderRadius: 8,
  },
  leftSide: {
    flex: 0.6,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 8,
  },
  rightSide: {
    flex: 0.4,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    textAlign: "right",
    padding: 8,
  },
  storeName: {
    ...fonts.bigChoice,
    color: colors.white,
  },
  date: {
    ...fonts.text,
    color: colors.white,
  },
  total: {
    ...fonts.text,
    textAlign: "right",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalHeader: {
    ...fonts.text,
    color: colors.gray,
  },
  totalValue: {
    ...fonts.text,
    paddingLeft: 16,
    color: colors.gray,
  },
  totalGlobalHeader: {
    ...fonts.bigText,
    color: colors.secondary,
  },
  totalGlobalValue: {
    ...fonts.bigText,
    paddingLeft: 16,
    color: colors.primary,
  },
  totalUnit: {
    ...fonts.bigText,
    paddingLeft: 8,
    color: colors.info,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    margin: 24,
    padding: 8,
    backgroundColor: colors.error,
    borderRadius: 5,
  },
  cancelButtonText: {
    ...fonts.text,
    color: colors.white,
  },
  totals: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

const CommandeListItem = (props) => {
  const { item, dispatch, isArabe } = props;
  const totalCommande = () => {
    let total = 0;
    item.commandeProducts.forEach((commandeProduct) => {
      total =
        parseFloat(total) +
        parseFloat(commandeProduct.amount) *
          parseFloat(commandeProduct.product.price);
    });
    return parseFloat(total).toFixed(2);
  };

  const totalCommandeAndDelivery = () => {
    let total = 0;
    item.commandeProducts.forEach((commandeProduct) => {
      total =
        parseFloat(total) +
        parseFloat(commandeProduct.amount) *
          parseFloat(commandeProduct.product.price);
    });
    return (parseFloat(total) + parseFloat(item.delivreeFees)).toFixed(2);
  };

  const cancelAction = () => {
    Alert.alert(
      "Annuler votre commande",
      "etes vous sur de vouloir annuler votre commande ?",
      [
        {
          text: "non",
          style: "cancel",
        },
        {
          text: "oui",
          onPress: () => {
            dispatch(cancelOrder(item));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.blackBackground}>
          <ImageBackground
            source={{
              uri: `${API_URL}/api/static/stores/${item.store.image}`,
            }}
            style={styles.image}
            imageStyle={styles.disabledShadow}
            blurRadius={2}
          >
            <View style={styles.leftSide}>
              <Text style={styles.storeName}>
                {isArabe ? item.store.nameAr : item.store.name}
              </Text>
              <CommandeStatus status={item.status} />
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.date}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <FlatList
          data={item.commandeProducts}
          renderItem={({ item }) => <CommandeProductListItem item={item} />}
        />

        <View style={styles.bottomContainer}>
          <View style={styles.totals}>
            <View style={styles.total}>
              <Text style={styles.totalHeader}>
                {I18n.t("order.total_amount")}
              </Text>
              <Text style={styles.totalValue}>
                {totalCommande()} {I18n.t("money")}
              </Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalHeader}>
                {I18n.t("order.livraison")}
              </Text>
              <Text style={styles.totalValue}>
                {item.delivreeFees} {I18n.t("money")}
              </Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalGlobalHeader}>
                {I18n.t("order.total")}
              </Text>
              <Text style={styles.totalGlobalValue}>
                {totalCommandeAndDelivery()} {I18n.t("money")}
              </Text>
            </View>
          </View>

          {(item.status === "CREATED" || item.status === "CHEKING") && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelAction()}
            >
              <Text style={styles.cancelButtonText}>
                {I18n.t("order.cancel_button")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  return { isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(CommandeListItem);
