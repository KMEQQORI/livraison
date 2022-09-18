import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { API_URL } from "@env";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import I18n from "../../utils/i18n";
import { isArabe } from "../../utils/languageUtils";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "white",
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    width: "98%",
    marginHorizontal: "1%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 120,
  },
  imageContainer: {
    flex: 0.3,
  },
  ProductImage: {
    height: 100,
    borderRadius: 16,
  },
  productInfoContainer: {
    padding: 8,
    flex: 0.7,
  },
  productName: {
    ...fonts.bigText,
  },
  productDescription: {
    ...fonts.text,
    color: colors.gray,
  },
  productPrice: {
    ...fonts.bigText,
    color: colors.primary,
    marginTop: 12,
  },
  productPriceUnit: {
    ...fonts.small,
    color: colors.gray,
  },
  amountContainer: {
    width: "10%",
    height: 100,
    borderRightWidth: 1,
    borderRightColor: colors.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  amount: {
    ...fonts.bigText,
    color: colors.secondary,
  },
});

const ProductListItem = (props) => {
  const { item, handleSelectProduct, amount, isArabe } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectProduct}>
      <>
        {amount && (
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        )}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>
            {isArabe ? item.nameAr : item.name}
          </Text>
          <Text style={styles.productDescription}>
            {isArabe ? item.descriptionAr : item.description}
          </Text>
          <Text style={styles.productPrice}>
            {item.price}
            <Text style={styles.productPriceUnit}>
              {" "}
              {I18n.t("money")}/{isArabe ? item.unitTextAr : item.unitText}
            </Text>
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.ProductImage}
            resizeMethod="scale"
            source={{
              uri: `${API_URL}/api/static/products/${item.image}`,
            }}
          />
        </View>
      </>
    </TouchableOpacity>
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer } = state;
  const { cart } = storesReducer;
  const cartItem = cart.find((productCart) => {
    return productCart.product.id === ownProps.item.id;
  });
  const amount = cartItem?.amount;
  return { amount, isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(ProductListItem);
