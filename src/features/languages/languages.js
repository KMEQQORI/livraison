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
} from "react-native";
import { languages } from "./languagesParams";
import { colors } from "../../css/colors";
import { margins } from "../../css/margins";
import { fonts } from "../../css/fonts";
import {
  createNewUser,
  retrieveLanguage,
  setLanguage,
} from "../../actions/globalActions";
import { connect } from "react-redux";

import LogoSloganImage from "../../../assets/slogan.png";
import BackgroundImage from "../../../assets/background.jpg";

const styles = StyleSheet.create({
  container: {
    ...margins.noBarMargin,
    height: "100%",
    display: "flex",
    backgroundColor: colors.backgroundPrimary,
  },
  card: {
    width: "45%",
    margin: 8,
    padding: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  brandImage: {
    padding: 0,
    margin: 0,
    width: 256,
    height: 389,
  },
  brandTitle: {
    ...fonts.header,
    color: colors.white,
    textShadowColor: colors.secondary,
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
  LanguageImage: {
    padding: 24,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  LanguageName: {
    ...fonts.bigText,
    color: colors.primary,
    textAlign: "right",
  },
  topContainer: {
    flex: 0.8,
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  bottomContainer: {
    flex: 0.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
  },
  image: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  titleContainer: {
    width: 300,
    height: 100,
    top: 350,
    left: 25,
  },
});

const Languages = (props) => {
  const { dispatch, navigation, language, profile } = props;

  useEffect(() => {
    dispatch(retrieveLanguage());
  }, [language, profile]);

  const handleSelectLanguage = (item) => {
    dispatch(createNewUser());
    dispatch(setLanguage(item.value));
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundImage} style={styles.image}>
        <View style={styles.topContainer}>
          <View style={styles.brandContainer}>
            <Image
              style={styles.brandImage}
              resizeMethod="scale"
              source={LogoSloganImage}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={languages}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleSelectLanguage(item)}
              >
                <Image
                  style={styles.LanguageImage}
                  source={{
                    uri: `${API_URL}/api/static/icons/${item.image}`,
                  }}
                />
                <Text style={styles.LanguageName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { language, profile } = globalReducer;

  return { language, profile };
}

export default connect(mapStateToProps)(Languages);
