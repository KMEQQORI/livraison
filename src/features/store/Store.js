import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SectionList,
  Alert,
  ImageBackground,
} from "react-native";
import groupBy from "lodash/groupBy";
import ProductListItem from "./ProductListItem";
import ProductModal from "./productModal";
import { API_URL } from "@env";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import {
  resetCart,
  setCartStore,
  setProduct,
} from "../../actions/storesActions";
import I18n from "../../utils/i18n";
import { isArabe } from "../../utils/languageUtils";
import { Icon } from "react-native-elements";

import DeliveryImage from "../../../assets/delivery.png";
import RatingImage from "../../../assets/rating.png";
import TimeImage from "../../../assets/time.png";
import MoneyImage from "../../../assets/money.png";
import MenuImage from "../../../assets/menu.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  storeInfo: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    opacity: 0.9,
    borderWidth: 1,
    borderColor: colors.lightSecondary,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    marginBottom: 24,
  },
  commanderButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.secondary,
    justifyContent: "center",
    elevation: 6,
    paddingVertical: 16,
  },
  commanderButtonText: {
    ...fonts.big,
    marginLeft: 8,
    color: "white",
  },
  productsHeaderMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 1,
    borderColor: colors.secondary,
  },
  productsHeaderContainer: {
    padding: 16,
    marginBottom: 4,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productsHeader: {
    ...fonts.bigText,
    textAlign: "center",
    color: colors.secondary,
  },
  productsHeaderSeperator: {
    marginHorizontal: 16,
  },

  storeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "98%",
    marginHorizontal: "1%",
    backgroundColor: colors.white,
    marginBottom: 8,
    borderRadius: 16,
  },
  storeImage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 175,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  storeName: {
    ...fonts.bigText,
    color: colors.primary,
  },
  storeDescription: {
    ...fonts.small,
    color: colors.gray,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 6,
    flexWrap: "wrap",
  },
  tag: {
    color: colors.secondary,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightSecondary,
  },
  selectedTag: {
    color: colors.info,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  storeInformationContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  storeDelivery: {
    ...fonts.bigText,
    color: colors.darkGray,
    marginRight: 8,
  },
  storeDeliveryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 16,
    margin: 4,
    opacity: 0.9,
  },
  infoContainer: {
    width: "90%",
  },
  likesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "10%",
  },
  likesText: {
    ...fonts.text,
    color: colors.gray,
    margin: 4,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 4,
    width: 120,
  },
  timeText: {
    ...fonts.small,
    textAlign: "center",
    color: colors.lightSecondary,
    marginRight: 4,
  },
  costsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 4,
    width: 90,
  },
  storeInfoList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const Store = (props) => {
  const {
    dispatch,
    navigation,
    store,
    cartStore,
    language,
    isArabe,
    cart,
    storeProducts,
  } = props;

  useEffect(() => {}, [language]);

  const renderCosts = (costs) => {
    const items = [];
    for (let i = 0; i < parseInt(costs); i++) {
      items.push(
        <Image
          style={{ width: 24, height: 24 }}
          resizeMethod="scale"
          source={MoneyImage}
          key={i}
        />
      );
    }
    return items;
  };

  const [productModalVisible, setProductModalVisible] = useState(false);
  const handleSelectProduct = (product) => {
    if (cartStore && store.id !== cartStore.id) {
      Alert.alert(
        "Vider le panier",
        "Vous avez deja un panier avec un autre commercant ," +
          "vous ne pouvez commander que chez un commercant à la fois par livraison  ," +
          " voulez-vous annuler le panier de l'autre commercant",
        [
          {
            text: "vider le panier",
            onPress: () => {
              dispatch(resetCart());
            },
          },
          {
            text: "garder",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else if (!cartStore) {
      dispatch(setCartStore(store));
      dispatch(setProduct(product));
      setProductModalVisible(true);
    } else {
      dispatch(setProduct(product));
      setProductModalVisible(true);
    }
  };
  return store !== null ? (
    <>
      <SafeAreaView style={styles.container}>
        <SectionList
          ListHeaderComponent={
            <View style={styles.storeContainer}>
              <ImageBackground
                style={styles.storeImage}
                imageStyle={styles.storeImage}
                resizeMethod="scale"
                source={{
                  uri: `${API_URL}/api/static/stores/${store.image}`,
                }}
              >
                <View style={styles.storeDeliveryContainer}>
                  <Text style={styles.storeDelivery}>
                    {store.delivreeFees} {I18n.t("money")}
                  </Text>
                  <Image
                    style={{ width: 32, height: 32 }}
                    resizeMethod="scale"
                    source={DeliveryImage}
                  />
                </View>
              </ImageBackground>
              <View style={styles.storeInformationContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.storeName}>
                    {isArabe ? store.nameAr : store.name}
                  </Text>
                  <Text style={styles.storeDescription}>
                    {isArabe ? store.descriptionAr : store.description}
                  </Text>

                  <View style={styles.storeInfoList}>
                    {store.time ? (
                      <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{store.time}</Text>
                        <Image
                          style={{ width: 24, height: 24 }}
                          resizeMethod="scale"
                          source={TimeImage}
                        />
                      </View>
                    ) : null}
                    <View style={styles.costsContainer}>
                      {renderCosts(store.costs)}
                    </View>
                  </View>

                  <View style={styles.tagContainer}>
                    {store.tags.map((tag) => (
                      <Text style={styles.tag} key={tag.id}>
                        {isArabe ? tag.nameAr : tag.name}
                      </Text>
                    ))}
                  </View>
                </View>
                <View style={styles.likesContainer}>
                  <Image
                    style={{ width: 32, height: 32 }}
                    resizeMethod="scale"
                    source={RatingImage}
                  />
                  <Text style={styles.likesText}>{store.likes}</Text>
                </View>
              </View>
            </View>
          }
          sections={storeProducts}
          renderItem={({ item, index }) => (
            <ProductListItem
              item={item}
              handleSelectProduct={() => handleSelectProduct(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.productsHeaderMainContainer}>
              <View style={styles.productsHeaderContainer}>
                <Text style={styles.productsHeader}>{title}</Text>
                <Image
                  style={{ width: 24, height: 24, marginLeft: 8 }}
                  resizeMethod="scale"
                  source={MenuImage}
                />
              </View>
            </View>
          )}
        />
        {cart.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TabNavigation", { screen: "Panier" });
            }}
            style={styles.commanderButton}
          >
            <Icon name="shopping-cart" size={26} color={colors.white} />
            <Text style={styles.commanderButtonText}>
              {I18n.t("store.cart")}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
      {productModalVisible && (
        <ProductModal
          modalVisible={productModalVisible}
          navigation={navigation}
          setProductModalVisible={setProductModalVisible}
        />
      )}
    </>
  ) : null;
};

function mapStateToProps(state, ownProps) {
  const { storesReducer, globalReducer } = state;
  const { store, cartStore, cart } = storesReducer;
  const groupedProducts = groupBy(store?.products, (produit) =>
    isArabe(state) ? produit.categoryAr : produit.category
  );
  const storeProducts = Object.keys(groupedProducts).map(function (key) {
    return {
      title: key,
      data: groupedProducts[key],
    };
  });
  const { language } = globalReducer;
  return {
    store,
    cartStore,
    cart,
    language,
    isArabe: isArabe(state),
    storeProducts,
  };
}

export default connect(mapStateToProps)(Store);
