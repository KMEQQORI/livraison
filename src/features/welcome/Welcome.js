import React, { useEffect } from "react";
import { API_URL } from "@env";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../css/colors";
import { margins } from "../../css/margins";
import { fonts } from "../../css/fonts";
import { retrieveLanguage } from "../../actions/globalActions";
import { connect } from "react-redux";
import { MaterialIcons } from "react-native-vector-icons";
import { AntDesign } from "@expo/vector-icons";
import I18n from "../../utils/i18n";

import LogoBlue512 from "../../../assets/logo-bleu-512.png";
import BackgroundImage from "../../../assets/background.jpg";
import localisation from "../../../assets/localisation.png";
import PhoneImage from "../../../assets/phone.png";

const styles = StyleSheet.create({
  container: {
    ...margins.noBarMargin,
    height: "100%",
    display: "flex",
    backgroundColor: colors.backgroundPrimary,
  },
  topContainer: {
    flex: 0.3,
    backgroundColor: "white",
  },
  bottomContainer: {
    flex: 0.7,
    padding: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 36,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
  },
  brandImage: {
    padding: 0,
    margin: 0,
    width: 150,
    height: 150,
  },
  image: {
    flex: 1,
  },
  brandContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  brandTitle: {
    ...fonts.header,
    color: colors.white,
    textShadowColor: colors.lightSecondary,
    textShadowOffset: { height: 0, width: 0 },
    textShadowRadius: 16,
    textAlign: "center",
    padding: 0,
  },
  brandSubTitle: {
    ...fonts.secondaryHeader,
    padding: 0,
    color: colors.secondary,
    textAlign: "center",
    textShadowColor: colors.primary,
    textShadowOffset: { height: 0, width: 0 },
    textShadowRadius: 2,
  },
  brandSlogan: {
    ...fonts.bigText,
    color: colors.info,
    textShadowColor: colors.primary,
    textShadowOffset: { height: 0, width: 0 },
    textShadowRadius: 2,
    textAlign: "center",
  },
  introductionText: {
    ...fonts.text,
    color: colors.primary,
  },
  autorisationListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  autorisationItemContainer: {
    marginVertical: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  autorisationItemTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  autorisationItemtext: {
    ...fonts.bigText,
    color: colors.primary,
    marginLeft: 24,
  },
  autorisationItemButton: {
    ...fonts.text,
    color: colors.info,
    borderWidth: 1,
    borderColor: colors.info,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 16,
    borderRadius: 16,
    textAlign: "center",
  },
  bottomButtons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  skipButton: {
    ...fonts.bigText,
    color: colors.white,
    backgroundColor: colors.darkGray,
    paddingVertical: 10,
    paddingHorizontal: 24,
    margin: 16,
    borderRadius: 16,
    textAlign: "center",
  },
  loaderContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Welcome = (props) => {
  const { dispatch, navigation, profile, isLocationReady, isPhoneNumberReady } =
    props;

  useEffect(() => {
    dispatch(retrieveLanguage());
  });

  const handelChooseLocation = () => {
    navigation.navigate("UserLocationEdit");
  };

  const handelSavePhoneNumber = () => {
    navigation.navigate("UserPhoneNumberEdit");
  };

  const handleSkip = () => {
    navigation.navigate("Services");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground source={BackgroundImage} style={styles.image}>
          <View style={styles.brandContainer}>
            <Image
              style={styles.brandImage}
              resizeMethod="scale"
              source={LogoBlue512}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottomContainer}>
        <Text styles={styles.introductionText}>
          {I18n.t("welcome_page.autorisations_text")}
        </Text>
        {!profile ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.secondary} />
          </View>
        ) : (
          <>
            {!isLocationReady && (
              <View style={styles.autorisationItemContainer}>
                <View style={styles.autorisationItemTextContainer}>
                  <Image
                    style={{ width: 32, height: 32 }}
                    resizeMethod="scale"
                    source={localisation}
                  />
                  <Text style={styles.autorisationItemtext}>
                    {I18n.t("welcome_page.localisation_text")}
                  </Text>
                </View>
                <TouchableOpacity onPress={handelChooseLocation}>
                  <Text style={styles.autorisationItemButton}>
                    {I18n.t("welcome_page.localisation_button")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {!isPhoneNumberReady && (
              <View style={styles.autorisationItemContainer}>
                <View style={styles.autorisationItemTextContainer}>
                  <Image
                    style={{ width: 32, height: 32, marginRight: 8 }}
                    resizeMethod="scale"
                    source={PhoneImage}
                  />
                  <Text style={styles.autorisationItemtext}>
                    {I18n.t("welcome_page.phone_number_text")}
                  </Text>
                </View>
                <TouchableOpacity onPress={handelSavePhoneNumber}>
                  <Text style={styles.autorisationItemButton}>
                    {I18n.t("welcome_page.phone_number_button")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        <TouchableOpacity style={styles.bottomButtons} onPress={handleSkip}>
          <Text style={styles.skipButton}>
            {I18n.t("welcome_page.skip_button")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer, storesReducer } = state;
  const { profile } = globalReducer;
  const isLocationReady =
    profile?.longitude !== null && profile?.latitude !== null;
  const isPhoneNumberReady = profile?.phoneNumber !== null;
  return {
    isLocationReady,
    isPhoneNumberReady,
    profile,
  };
}

export default connect(mapStateToProps)(Welcome);
