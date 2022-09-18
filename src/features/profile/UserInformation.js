import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import user from "../../../assets/user.png";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";
import I18n from "../../utils/i18n";

const styles = StyleSheet.create({
  userInfo: {
    display: "flex",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 12,
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...fonts.bigText,
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
});

const UserInformation = (props) => {
  const { navigation, profile, language, enableEditing } = props;

  useEffect(() => {}, [language]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserInformationEdit")}
      style={styles.userInfo}
    >
      <View>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Image
              style={{ width: 32, height: 32, marginRight: 8 }}
              resizeMethod="scale"
              source={user}
            />
            <Text> {I18n.t("profile.user_informations.header")}</Text>
          </View>
        </View>
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoTitle}>
          {I18n.t("profile.user_informations.user_name")}
        </Text>
        <Text style={styles.userInfoValue}>{profile?.name}</Text>
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoTitle}>
          {I18n.t("profile.user_informations.instructions")}
        </Text>
        <Text style={styles.userInfoValue}>{profile?.instructions}</Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { profile, language } = globalReducer;
  return { profile, language };
}

export default connect(mapStateToProps)(UserInformation);
