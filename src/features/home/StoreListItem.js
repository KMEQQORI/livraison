import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { API_URL } from "@env";
import { retrieveStore } from "../../actions/storesActions";
import { connect } from "react-redux";
import { isArabe } from "../../utils/languageUtils";
import I18n from "../../utils/i18n";

import DeliveryImage from "../../../assets/delivery.png";
import RatingImage from "../../../assets/rating.png";
import TimeImage from "../../../assets/time.png";
import MoneyImage from "../../../assets/money.png";
import ClosedImage from "../../../assets/closed.png";

const styles = StyleSheet.create({
  container: {
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
    width: "80%",
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
  closeStoreContainer: {
    flex: 1,
    backgroundColor: colors.darkGray,
    position: "absolute",
    elevation: 5,
    height: "100%",
    width: "100%",
    opacity: 0.6,
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.info,
  },
  closeStoreText: {
    ...fonts.bigChoice,
    color: colors.white,
    opacity: 1,
  },
});

const StoreListItem = (props) => {
  const { item, navigation, selectedTags, isArabe, dispatch } = props;

  const isSelectedTag = (tag) => {
    return selectedTags.find((selectedTag) => selectedTag.id === tag.id);
  };

  const tagStyle = (tag) => {
    return isSelectedTag(tag) ? styles.selectedTag : styles.tag;
  };

  const handleSelectStore = (item) => {
    dispatch(retrieveStore(item));
    navigation.navigate("Store");
  };

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

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleSelectStore(item)}
        disabled={item.open !== "OPEN"}
      >
        <ImageBackground
          style={styles.storeImage}
          imageStyle={styles.storeImage}
          resizeMethod="scale"
          source={{
            uri: `${API_URL}/api/static/stores/${item.image}`,
          }}
        >
          <View style={styles.storeDeliveryContainer}>
            <Text style={styles.storeDelivery}>
              {item.delivreeFees} {I18n.t("money")}
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
              {isArabe ? item.nameAr : item.name}
            </Text>
            <Text style={styles.storeDescription}>
              {isArabe ? item.descriptionAr : item.description}
            </Text>

            <View style={styles.storeInfoList}>
              {item.time ? (
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <Image
                    style={{ width: 24, height: 24 }}
                    resizeMethod="scale"
                    source={TimeImage}
                  />
                </View>
              ) : null}
              <View style={styles.costsContainer}>
                {renderCosts(item.costs)}
              </View>
            </View>

            <View style={styles.tagContainer}>
              {item.tags.map((tag) => (
                <Text style={tagStyle(tag)} key={tag.name}>
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
            <Text style={styles.likesText}>{item.likes}</Text>
          </View>
        </View>
        {item.open !== "OPEN" && (
            <View style={styles.closeStoreContainer}>
              <Image
                  style={{ width: 200, height: 200 }}
                  resizeMethod="scale"
                  source={ClosedImage}
              />
            </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer } = state;
  const { selectedTags } = storesReducer;
  return { selectedTags, isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(StoreListItem);
