import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";
import I18n from "../../utils/i18n";

import PhoneImage from "../../../assets/phone.png";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 12,
    marginBottom: 16,
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...fonts.bigText,
  },
  userInfo: {
    display: "flex",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 16,
    borderRadius: 16,
  },
  userInfoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    color: colors.darkGray,
    paddingHorizontal: 32,
    paddingVertical: 4,
    width: "80%",
  },
  userInfoTitle: {
    ...fonts.text,
    color: colors.gray,
    marginHorizontal: 8,
  },
  userInfoValue: {
    ...fonts.text,
    color: colors.darkGray,
    textAlign: "left",
  },
  updateButton: {
    ...fonts.text,
    color: colors.white,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 6,
    marginHorizontal: 16,
  },
  mapContainer: {
    margin: 8,
    borderWidth: 1,
    borderColor: colors.backgroundGray,
  },
  map: {
    height: 150,
  },
  phoneNumberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneNumber: {
    ...fonts.bigChoice,
    color: colors.secondary,
  },
});

const UserPhoneNumber = (props) => {
  const { dispatch, navigation, profile, language, enableEditing } = props;

  useEffect(() => {}, [language, profile]);

  const updatePhoneNumber = () => {
    navigation.navigate("UserPhoneNumberEdit");
  };
  return (
    <TouchableOpacity
      onPress={() => updatePhoneNumber()}
      style={styles.userInfo}
    >
      <View>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Image
              style={{ width: 32, height: 32, marginRight: 8 }}
              resizeMethod="scale"
              source={PhoneImage}
            />
            <Text> {I18n.t("profile.phone_number.header")}</Text>
          </View>
        </View>
      </View>
      <View style={styles.phoneNumberContainer}>
        {profile?.phoneNumber ? (
          <Text style={styles.phoneNumber}>+{profile?.phoneNumber}</Text>
        ) : (
          <TouchableOpacity onPress={updatePhoneNumber}>
            <Text style={styles.updateButton}>
              {I18n.t("profile.phone_number.add_phone_number")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { profile, language } = globalReducer;
  return { profile, language };
}

export default connect(mapStateToProps)(UserPhoneNumber);
