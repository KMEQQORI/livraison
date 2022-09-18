import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  View,
  TextInput,
} from "react-native";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { Icon } from "react-native-elements";
import { addProductToCart } from "../../actions/storesActions";
import { connect } from "react-redux";
import { API_URL } from "@env";
import I18n from "../../utils/i18n";
import { isArabe } from "../../utils/languageUtils";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    padding: 16,
    width: "95%",
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalMainContainer: {
    display: "flex",
    flexDirection: "column",
  },
  modalButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  productImage: {
    width: "100%",
    borderRadius: 18,
    height: 220,
  },
  cancelButton: {
    backgroundColor: colors.info,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 10,
  },
  productAmountContainer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productAmount: {
    color: colors.primary,
    ...fonts.header,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  porductDetail: {
    padding: 16,
  },
  productName: {
    ...fonts.text,
  },
  productDescription: {
    ...fonts.text,
    color: colors.gray,
  },
  productPrice: {
    ...fonts.text,
    color: colors.secondary,
  },
  productPriceUnit: {
    ...fonts.text,
    color: colors.secondary,
  },
  finalPrice: {
    ...fonts.header,
    color: colors.info,
  },
  productAmountValueContainer: {
    width: 200,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productAmountUnit: {
    ...fonts.bigText,
    padding: 4,
  },
  commentInput: {
    padding: 8,
    margin: 8,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 16,
    color: colors.primary,
    borderColor: colors.gray,
    backgroundColor: colors.background,
  },
});

const ProductModal = (props) => {
  const {
    dispatch,
    navigation,
    modalVisible,
    setProductModalVisible,
    product,
    oldAmount,
    isArabe,
  } = props;
  const [amount, setAmount] = useState(
    oldAmount ? parseFloat(oldAmount).toFixed(2) : 0
  );
  const [comment, setComment] = useState("");

  const handleAddAmount = () => {
    setAmount((parseFloat(amount) + parseFloat(product.unit)).toFixed(2));
  };

  const handleRemoveAmount = () => {
    if (parseFloat(amount) > parseFloat(product.unit))
      setAmount((parseFloat(amount) - parseFloat(product.unit)).toFixed(2));
  };

  const handleValidate = () => {
    dispatch(addProductToCart(product, amount, comment));
    setProductModalVisible(false);
  };

  const handleComment = (value) => {
    setComment(value);
  };

  return product ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setProductModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalMainContainer}>
            {product.image !== "" && (
              <Image
                style={styles.productImage}
                resizeMethod="scale"
                source={{
                  uri: `${API_URL}/api/static/products/${product.image}`,
                }}
              ></Image>
            )}
            <View style={styles.porductDetail}>
              <Text style={styles.productName}>
                {isArabe ? product.nameAr : product.name}
              </Text>
              <Text style={styles.productDescription}>
                {isArabe ? product.descriptionAr : product.description}
              </Text>
              <Text style={styles.productPrice}>
                {product.price}
                <Text style={styles.productPriceUnit}>
                  {" "}
                  {I18n.t("money")}/
                  {isArabe ? product.unitTextAr : product.unitText}
                </Text>
              </Text>
            </View>
            <TextInput
              placeholder="ajouter un commentaire"
              placeholderTextColor={colors.gray}
              style={styles.commentInput}
              value={comment}
              onChangeText={handleComment}
            />
            <View style={styles.productAmountContainer}>
              <TouchableOpacity onPress={handleRemoveAmount}>
                <Icon
                  name="remove-circle-outline"
                  color={colors.info}
                  size={48}
                />
              </TouchableOpacity>

              <View style={styles.productAmountValueContainer}>
                <Text style={styles.productAmount}>{parseFloat(amount)}</Text>
                <Text Text style={styles.productAmountUnit}>
                  {isArabe ? product.unitTextAr : product.unitText}
                </Text>
              </View>
              <TouchableOpacity onPress={handleAddAmount}>
                <Icon name="add-circle-outline" color={colors.info} size={48} />
              </TouchableOpacity>
            </View>
            <View style={styles.productAmountContainer}>
              <Text style={styles.finalPrice}>
                {(parseFloat(amount) * parseFloat(product.price)).toFixed(2)}
                <Text style={styles.productPrice}> {I18n.t("money")}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.modalButtonsContainer}>
            <TouchableHighlight
              style={styles.cancelButton}
              onPress={() => setProductModalVisible(false)}
            >
              <Text style={styles.textStyle}>
                {I18n.t("product_modal.cancel_button")}{" "}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.addButton}
              onPress={handleValidate}
              disabled={amount === 0}
            >
              <Text style={styles.textStyle}>
                {I18n.t("product_modal.validate_button")}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

function mapStateToProps(state, ownProps) {
  const { storesReducer } = state;
  const { product, cart } = storesReducer;
  const productCart = cart.find(
    (cartProduct) => cartProduct.product.id === product.id
  );
  const amount = productCart?.amount;
  return { product, oldAmount: amount, isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(ProductModal);
