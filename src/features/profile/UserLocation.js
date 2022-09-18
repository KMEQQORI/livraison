import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";
import I18n from "../../utils/i18n";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

import LocalisationImage from "../../../assets/localisation.png";

const styles = StyleSheet.create({
  userInfo: {
    display: "flex",
    marginTop: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 16,
    borderRadius: 16,
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginLeft: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    ...fonts.bigText,
    marginLeft: 8,
    color: colors.primary,
  },
  updateButton: {
    ...fonts.text,
    color: colors.white,
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 6,
    margin: 8,
  },
  mapContainer: {
    width: "100%",
    margin: 8,
    borderWidth: 1,
    borderColor: colors.backgroundGray,
  },
  map: {
    height: 150,
  },
  addressInfoItem: {
    width: "100%",
    paddingHorizontal: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const UserLocation = (props) => {
  const { dispatch, navigation, profile, language, enableEditing } = props;

  useEffect(() => {}, [language, profile]);

  const updateLocation = () => {
    navigation.navigate("UserLocationEdit");
  };

  return (
    <TouchableOpacity onPress={updateLocation} style={styles.userInfo}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            style={{ width: 32, height: 32, marginRight: 8 }}
            resizeMethod="scale"
            source={LocalisationImage}
          />
          <Text style={styles.headerText}>
            {I18n.t("profile.location.header")}
          </Text>
        </View>
      </View>
      <View style={styles.addressInfoItem}>
        {profile?.latitude && profile?.longitude ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(profile.latitude),
                longitude: parseFloat(profile.longitude),
                latitudeDelta: 0.006,
                longitudeDelta: 0.006,
              }}
              showsUserLocation={true}
            >
              <Marker
                icon={"shopping-cart"}
                coordinate={{
                  latitude: parseFloat(profile.latitude),
                  longitude: parseFloat(profile.longitude),
                }}
              />
            </MapView>
          </View>
        ) : (
          <TouchableOpacity onPress={updateLocation}>
            <Text style={styles.updateButton}>
              {I18n.t("profile.location.add_location")}
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

export default connect(mapStateToProps)(UserLocation);
