import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { colors } from "../../css/colors";
import { margins } from "../../css/margins";
import { fonts } from "../../css/fonts";
import { API_URL } from "@env";
import { connect } from "react-redux";
import { retrieveServices, setService } from "../../actions/storesActions";
import I18n from "../../utils/i18n";
import { isArabe } from "../../utils/languageUtils";
import LogoBlue512 from "../../../assets/logo-bleu-512.png";

const styles = StyleSheet.create({
  container: {
    ...margins.noBarMargin,
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: "96%",
    width: 300,
    marginHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.lightSecondary,
  },
  ServiceImage: {
    width: 295,
    height: "50%",
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    backgroundColor: colors.backgroundGray,
  },
  ServiceName: {
    ...fonts.bigChoice,
    color: colors.lightSecondary,
    margin: 16,
    textAlign: "center",
  },
  subTitle: {
    ...fonts.secondaryHeader,
    color: colors.primary,
    textAlign: "center",
  },
  listContent: {
    marginBottom: 16,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tag: {
    color: colors.primary,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.info,
  },
  topContainer: {
    width: "100%",
  },
  brandContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  brandImage: {
    width: 55,
    height: 55,
  },
  brandTitle: {
    ...fonts.header,
    color: colors.primary,
    textAlign: "center",
  },
  brandSubTitle: {
    ...fonts.bigText,
    color: colors.primary,
    textAlign: "center",
  },
  header: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

const Services = (props) => {
  const { navigation, dispatch, services, language, profile, isArabe } = props;

  useEffect(() => {
    dispatch(retrieveServices());
  }, [language, profile]);

  const hadnelSelectService = (item) => {
    dispatch(setService(item));
    navigation.navigate("TabNavigation");
  };

  return (
    <ImageBackground style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.brandImage}
          resizeMethod="scale"
          source={LogoBlue512}
        />
        <Text style={styles.subTitle}>{I18n.t("service_page.main_title")}</Text>
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            key={item.image}
            onPress={() => hadnelSelectService(item)}
          >
            <Image
              style={styles.ServiceImage}
              source={{
                uri: `${API_URL}/api/static/services/${item.image}`,
              }}
            />
            <Text style={styles.ServiceName}>
              {isArabe ? item.nameAr : item.name}
            </Text>
            <View style={styles.tagContainer}>
              {item.tags.map((tag) => (
                <Text style={styles.tag} key={tag.id}>
                  {isArabe ? tag.nameAr : tag.name}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        horizontal={true}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer, globalReducer } = state;
  const { services } = storesReducer;
  const { language, profile } = globalReducer;
  return { services, language, profile, isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(Services);
