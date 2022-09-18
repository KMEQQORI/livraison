import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";
import I18n from "../../utils/i18n";
import { setLanguage } from "../../actions/globalActions";

import LanguageImage from "../../../assets/language.png";
import FrancaisImage from "../../../assets/francais.png";
import ArabeImage from "../../../assets/arabe.png";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    backgroundColor: colors.white,
    paddingTop: 16,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 16,
    borderRadius: 16,
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
  language: {
    marginLeft: 32,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  LanguageName: {
    ...fonts.text,
    textAlign: "left",
  },
  LanguageImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 24,
  },
});

const ProfileLanguages = (props) => {
  const { dispatch, language } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 32, height: 32, marginRight: 8 }}
          resizeMethod="scale"
          source={LanguageImage}
        />
        <Text style={styles.headerText}>
          {I18n.t("profile.language_change_text")}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.language}
        onPress={() => {
          dispatch(setLanguage("fr"));
        }}
      >
        <Image style={styles.LanguageImage} source={FrancaisImage} />
        <Text style={styles.LanguageName}>Francais</Text>
        {language === "fr" && (
          <AntDesign name="check" size={24} color="black" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.language}
        onPress={() => {
          dispatch(setLanguage("ar"));
        }}
      >
        <Image style={styles.LanguageImage} source={ArabeImage} />
        <Text style={styles.LanguageName}>العربية</Text>
        {language === "ar" && (
          <AntDesign name="check" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { language } = globalReducer;
  return { language };
}

export default connect(mapStateToProps)(ProfileLanguages);
