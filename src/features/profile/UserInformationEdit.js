import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";
import { updateProfile } from "../../actions/globalActions";
import I18n from "../../utils/i18n";
import user from "../../../assets/user.png";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    display: "flex",
    ...fonts.bigText,
  },
  userInfo: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    borderColor: colors.lightGray,
  },
  userInfoItem: {
    ...fonts.Text,
    color: colors.darkGray,
    padding: 16,
  },
  userInfoTitle: {
    ...fonts.small,
    color: colors.gray,
  },
  userInfoValue: {
    ...fonts.text,
    color: colors.darkGray,
  },
  updateButton: {
    ...fonts.text,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    color: colors.secondary,
    backgroundColor: colors.white,
    textAlign: "center",
  },
  userInfoInput: {
    ...fonts.text,
    width: "100%",
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    margin: 4,
  },
  nameInputs: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const UserInformationEdit = (props) => {
  const { navigation, dispatch, profile, language } = props;
  const [name, setName] = useState(profile?.name || null);
  const [instructions, setInstructions] = useState(
    profile?.instructions || null
  );

  useEffect(() => {}, [language]);

  const handleUpdate = () => {
    if (name) {
      dispatch(updateProfile({ name, instructions }));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.userInfo}>
      <View style={styles.header}>
        <Image
          style={{ width: 32, height: 32, marginRight: 8 }}
          resizeMethod="scale"
          source={user}
        />
        <Text style={styles.headerText}>
          <Text>{I18n.t("profile.edit_user_informations.header")} </Text>
        </Text>
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoTitle}>
          {I18n.t("profile.edit_user_informations.user_name")}
        </Text>
        <TextInput
          placeholderTextColor={colors.gray}
          style={styles.userInfoInput}
          value={name}
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoTitle}>
          {I18n.t("profile.edit_user_informations.instructions")}
        </Text>
        <TextInput
          style={styles.userInfoInput}
          value={instructions}
          onChangeText={(value) => setInstructions(value)}
        />
      </View>
      <TouchableOpacity onPress={handleUpdate}>
        <Text style={styles.updateButton}>
          {I18n.t("profile.edit_user_informations.edit_button")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { profile, language } = globalReducer;
  return { profile, language };
}

export default connect(mapStateToProps)(UserInformationEdit);
