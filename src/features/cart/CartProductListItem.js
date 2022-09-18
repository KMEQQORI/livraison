import React, { useContext } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { API_URL } from "@env";
import I18n from "../../utils/i18n";
import { isArabe } from "../../utils/languageUtils";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    borderRadius: 16,
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
    ...fonts.small,
    color: colors.gray,
  },
  productPriceUnit: {
    ...fonts.small,
    color: colors.gray,
  },
  totalPrice: {
    ...fonts.small,
    color: colors.primary,
    marginTop: 12,
  },
  disabledShadow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: colors.gray,
    opacity: 0.2,
  },
});

const CartProductListItem = (props) => {
  const { item, handleSelectProduct, disbaled, isArabe } = props;
  return (
    <View
      style={styles.container}
      disabled={disbaled}
      onPress={handleSelectProduct}
    >
      {disbaled && <View style={styles.disabledShadow} />}
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>
          {isArabe ? item.product.nameAr : item.product.name}
        </Text>
        <Text style={styles.productDescription}>
          {isArabe ? item.product.descriptionAr : item.product.description}
        </Text>
        <Text style={styles.productPrice}>
          {item.product.price} {I18n.t("money")}/
          {isArabe ? item.unitTextAr : item.unitText} x {item.amount}{" "}
          {isArabe ? item.unitTextAr : item.unitText}
        </Text>
        <Text style={styles.totalPrice}>
          {(parseFloat(item.amount) * parseFloat(item.product.price)).toFixed(
            2
          )}{" "}
          {I18n.t("money")}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.ProductImage}
          resizeMethod="scale"
          source={{
            uri: `${API_URL}/api/static/products/${item.product.image}`,
          }}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  return { isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(CartProductListItem);
