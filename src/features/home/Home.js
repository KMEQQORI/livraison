import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { colors } from "../../css/colors";
import { margins } from "../../css/margins";
import StoreListItem from "./StoreListItem";
import Tags from "./Tags";
import Ads from "./Ads";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import { API_URL } from "@env";
import { retrieveAds, retrieveStores } from "../../actions/storesActions";
import I18n from "../../utils/i18n";
import { MaterialIcons } from "react-native-vector-icons";
import EmptyStore from "./EmptyStore";
import choice from "../../../assets/choice.png";
import localisation from "../../../assets/localisation.png";

const styles = StyleSheet.create({
  container: {
    ...margins.noBarMargin,
    flex: 1,
    backgroundColor: colors.background,
  },
  serviceButton: {
    padding: 8,
    margin: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightSecondary,
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceButtonText: {
    ...fonts.bigText,
    borderRadius: 16,
    color: colors.primary,
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  localisationAlertContainer: {
    padding: 16,
    margin: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.info,
    backgroundColor: colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  localisationAlertText: {
    ...fonts.small,
    color: colors.darkGray,
  },
  localisationAlertContainerButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 8,
    margin: 8,
    borderRadius: 16,
    borderColor: colors.info,
    borderWidth: 1,
  },
  localisationAlertContainerButtonText: {
    color: colors.info,
    marginLeft: 8,
  },
});

const Home = (props) => {
  const { navigation, dispatch, stores, service, language, profile } = props;

  const handleChangeService = () => {
    navigation.navigate("Services");
  };

  const handleChangeLocation = () => {
    navigation.navigate("UserLocationEdit");
  };

  useEffect(() => {
    dispatch(retrieveStores(service));
    dispatch(retrieveAds(service));
  }, [service, language, profile]);

  return (
    <SafeAreaView style={styles.container}>
      {stores && (
        <FlatList
          data={stores}
          ListHeaderComponent={
            <>
              <View style={styles.headerButtons}>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={handleChangeService}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    resizeMethod="scale"
                    source={choice}
                  />
                  <Text style={styles.serviceButtonText}>
                    {I18n.t("home_page.change_service_button")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.serviceButton}
                  onPress={handleChangeLocation}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    resizeMethod="scale"
                    source={localisation}
                  />
                  <Text style={styles.serviceButtonText}>
                    {I18n.t("home_page.change_location")}
                  </Text>
                </TouchableOpacity>
              </View>
              {!(profile?.latitude && profile?.longitude) && (
                <View style={styles.localisationAlertContainer}>
                  <Text style={styles.localisationAlertText}>
                    {I18n.t("home_page.localisation_alert")}
                  </Text>
                  <TouchableOpacity
                    onPress={handleChangeLocation}
                    style={styles.localisationAlertContainerButton}
                  >
                    <MaterialIcons
                      name="gps-fixed"
                      size={24}
                      color={colors.info}
                    />
                    <Text style={styles.localisationAlertContainerButtonText}>
                      {I18n.t("home_page.location_alert_button_text")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Ads />
              <Tags />
            </>
          }
          renderItem={({ item }) => (
            <StoreListItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={({ item }) => <EmptyStore />}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer, globalReducer } = state;
  const { stores, selectedTags, service } = storesReducer;
  const { language, profile } = globalReducer;

  const filtredStores =
    selectedTags.length > 0
      ? stores.filter((store) => {
          return store.tags?.some((tag) =>
            selectedTags.find((selectedTag) => selectedTag.id === tag.id)
          );
        })
      : stores;
  return { stores: filtredStores, service, language, profile };
}

export default connect(mapStateToProps)(Home);
