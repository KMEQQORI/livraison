import React, { useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Linking,
  Alert,
  Image,
  View,
} from "react-native";
import { connect } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../css/colors";
import { margins } from "../../css/margins";
import { logOut } from "../../actions/globalActions";
import ProfileButton from "./ProfileButton";
import SocialMedia from "./SocialMedia";
import I18n from "../../utils/i18n";
import ProfileLanguages from "./profileLanguages";
import UserLocation from "./UserLocation";
import UserPhoneNumber from "./UserPhoneNumber";
import UserInformation from "./UserInformation";
import { API_URL } from "@env";
import CommandesImage from "../../../assets/commandes.png";
import LogoutImage from "../../../assets/logout.png";
import ServiceClientImage from "../../../assets/services.png";

const styles = StyleSheet.create({
  container: {
    ...margins.noBarMargin,
    backgroundColor: colors.background,
    flex: 1,
  },
});

const Profile = (props) => {
  const { dispatch, navigation, language, profile } = props;

  const serviceClientAction = () => {
    Linking.openURL(`tel:0707196461`);
  };

  const logOutAction = () => {
    Alert.alert(
      "Se déconnecter de l'application",
      "etes vous sur de vouloir se déconnecter  ",
      [
        {
          text: "Se déconnecter",
          onPress: () => {
            dispatch(logOut(navigation));
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {}, [language, profile]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <UserInformation navigation={navigation} />
        <UserPhoneNumber navigation={navigation} />
        <UserLocation navigation={navigation} />
        <ProfileLanguages navigation={navigation} />
        <ProfileButton
          title={I18n.t("profile.orders_button")}
          icon={
            <Image
              style={{ width: 32, height: 32 }}
              resizeMethod="scale"
              source={CommandesImage}
            />
          }
          action={() => {
            navigation.navigate("Commandes");
          }}
        />
        <ProfileButton
          title={I18n.t("profile.client_service_button")}
          action={serviceClientAction}
          icon={
            <Image
              style={{ width: 32, height: 32 }}
              resizeMethod="scale"
              source={ServiceClientImage}
            />
          }
        />
        <ProfileButton
          title={I18n.t("profile.logout_button")}
          action={logOutAction}
          icon={
            <Image
              style={{ width: 32, height: 32 }}
              resizeMethod="scale"
              source={LogoutImage}
            />
          }
        />
        <SocialMedia />
      </ScrollView>
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { language, profile } = globalReducer;
  return { language, profile };
}

export default connect(mapStateToProps)(Profile);
