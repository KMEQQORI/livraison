import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";
import I18n from "../../utils/i18n";

import SocialImage from "../../../assets/youtube.png";
import InstagramImage from "../../../assets/instagram.png";
import FacebookImage from "../../../assets/facebook.png";
import YoutubeImage from "../../../assets/youtube.png";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 48,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  header: {
    marginLeft: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    ...fonts.bigText,
    marginLeft: 16,
  },
  socialText: {
    ...fonts.text,
    color: colors.gray,
    padding: 8,
  },
  socialItem: {
    paddingHorizontal: 64,
    paddingVertical: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const SocialMedia = (props) => {
  const {} = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 32, height: 32 }}
          resizeMethod="scale"
          source={SocialImage}
        />
        <Text style={styles.headerText}>{I18n.t("profile.social_header")}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://www.facebook.com/Choubik-109797554587791");
        }}
        style={styles.socialItem}
      >
        <Image
          style={{ width: 24, height: 24 }}
          resizeMethod="scale"
          source={FacebookImage}
        />
        <Text style={styles.socialText}>Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialItem}
        onPress={() => {
          Linking.openURL("https://www.instagram.com/choubiklivraison");
        }}
      >
        <Image
          style={{ width: 24, height: 24 }}
          resizeMethod="scale"
          source={InstagramImage}
        />
        <Text style={styles.socialText}>Instagram</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        <Image
          style={{ width: 24, height: 24 }}
          resizeMethod="scale"
          source={YoutubeImage}
        />
        <Text style={styles.socialText}>Youtube</Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(SocialMedia);
