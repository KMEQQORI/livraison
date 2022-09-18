import React, { useState } from "react";
import { API_URL } from "@env";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { updatePhoneNumber } from "../../actions/globalActions";
import { connect } from "react-redux";
import I18n from "../../utils/i18n";

import BackgroundFlouImage from "../../../assets/background-flou.jpg";
import LogoBlue512Image from "../../../assets/logo-bleu-512.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: colors.white,
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
  image: {
    flex: 1,
  },
  brandImage: {
    padding: 0,
    margin: 0,
    width: 150,
    height: 150,
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
  phoneContainer: {
    width: "100%",
  },
  introductionText: {
    ...fonts.text,
    color: colors.primary,
  },
  phoneNumberInput: {
    padding: 8,
    margin: 8,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 16,
    color: colors.primary,
    borderColor: colors.primary,
    backgroundColor: colors.backgroundGray,
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
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    margin: 16,
    borderRadius: 4,
  },
  disabled: {
    backgroundColor: colors.backgroundGray,
    color: colors.gray,
  },
});

const UserPhoneNumberEdit = (props) => {
  const { dispatch, navigation } = props;
  const [phoneNumberPlaceHolder, setPhoneNumberPlaceHolder] =
    useState("06 83 42 49 94");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, "");
    let phoneNumber = numbers[0];
    for (let i = 1; i < numbers.length && i < 10; i++) {
      phoneNumber = phoneNumber + numbers[i];
      if (i % 2) {
        phoneNumber = phoneNumber + " ";
      }
    }
    setPhoneNumber(phoneNumber ? phoneNumber.trim() : "");
  };

  const validatePhonenUmber = () => {
    return phoneNumber.length === 14 && phoneNumber[0] === "0";
  };

  const handleSubmitPhoneNumber = () => {
    if (validatePhonenUmber(phoneNumber)) {
      dispatch(updatePhoneNumber(phoneNumber));
      navigation.pop(1);
    } else {
      Alert.alert(
        I18n.t("alerts.login_page.wrong_number_title"),
        I18n.t("alerts.login_page.wrong_number_body"),
        [
          {
            text: I18n.t("alerts.login_page.wrong_number_cancel_button"),
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground source={BackgroundFlouImage} style={styles.image}>
          <View style={styles.brandContainer}>
            <Image
              style={styles.brandImage}
              resizeMethod="scale"
              source={LogoBlue512Image}
            />
          </View>
        </ImageBackground>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : ""}
        style={styles.bottomContainer}
      >
        <View style={styles.phoneContainer}>
          <Text style={styles.introductionText}>
            {I18n.t("login_page.input_text")}
          </Text>
          <TextInput
            placeholder={phoneNumberPlaceHolder}
            placeholderTextColor={colors.gray}
            style={styles.phoneNumberInput}
            keyboardType="number-pad"
            value={phoneNumber}
            onFocus={() => setPhoneNumberPlaceHolder("")}
            onChangeText={(value) => handlePhoneNumber(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.bottomButtons}
          onPress={handleSubmitPhoneNumber}
        >
          <Text
            style={[
              styles.skipButton,
              !validatePhonenUmber() && styles.disabled,
            ]}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(UserPhoneNumberEdit);
