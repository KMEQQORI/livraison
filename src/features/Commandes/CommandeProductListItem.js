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
    backgroundColor: "white",
    marginTop: 8,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    minHeight: 100,
  },
  imageContainer: {
    flex: 0.3,
  },
  ProductImage: {
    height: 100,
    borderRadius: 2,
  },
  productInfoContainer: {
    padding: 8,
    flex: 0.7,
  },
  productName: {
    ...fonts.text,
  },
  productDescription: {
    ...fonts.small,
    color: colors.gray,
  },
  productPrice: {
    ...fonts.text,
    color: colors.primary,
    marginTop: 12,
  },
  productPriceUnit: {
    ...fonts.small,
    color: colors.gray,
  },
  amountContainer: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: colors.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  amount: {
    ...fonts.bigText,
    color: colors.secondary,
    width: 50,
  },
  userComment: {
    ...fonts.bigText,
    color: colors.success,
  },
});

const CommandeProductListItem = (props) => {
  const { item, isArabe } = props;
  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>
          {isArabe ? item.product?.nameAr : item.product?.name}
        </Text>
        <Text style={styles.productDescription}>
          {isArabe ? item.product?.descriptionAr : item.product?.description}
        </Text>
        <Text style={styles.productPrice}>
          {item.product?.price}
          <Text style={styles.productPriceUnit}>
            {" "}
            {I18n.t("money")}/
            {isArabe ? item.product?.unitTextAr : item.product?.unitText}
          </Text>
        </Text>
        {item.comment ? (
          <Text style={styles.userComment}>{item.comment}</Text>
        ) : null}
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.ProductImage}
          resizeMethod="scale"
          source={{
            uri: `${API_URL}/api/static/products/${item.product?.image}`,
          }}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  return { isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(CommandeProductListItem);
