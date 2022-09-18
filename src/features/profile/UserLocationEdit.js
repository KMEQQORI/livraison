import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { margins } from "../../css/margins";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { MaterialIcons } from "react-native-vector-icons";
import Loader from "../comuns/Loader";
import { updateProfile } from "../../actions/globalActions";
import { connect } from "react-redux";
import I18n from "../../utils/i18n";
import HomeImage from "../../../assets/home.png";
import TargetImage from "../../../assets/target.png";

import GpsImage from "../../../assets/gps.png";

const styles = {
  loader: {
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
  },
  locationContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  locationButton: {
    position: "absolute",
    bottom: 16,
    width: "94%",
    marginHorizontal: "3%",
    backgroundColor: colors.info,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 10,
  },
  locationButtonText: {
    ...fonts.bigText,
    color: colors.white,
    textAlign: "center",
  },
  targetButton: {
    position: "absolute",
    bottom: 100,
    right: 16,
    width: 60,
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: colors.backgroundSecondary,
    elevation: 10,
  },
  gpsErrorContainer: {
    ...margins.noBarMargin,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    margin: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  errorTitle: {
    ...fonts.bigChoice,
    color: colors.errorText,
    textAlign: "center",
  },
  errorMessage: {
    ...fonts.text,
    color: colors.darkGray,
    textAlign: "center",
  },
  errorButton: {
    ...fonts.text,
    color: colors.warning,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 32,
    textAlign: "center",
  },
};

const UserLocationEdit = (props) => {
  let map = null;
  const { dispatch, navigation, profile } = props;

  const [location, setLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isGpsActivated, setIsGpsActivated] = useState(false);

  const [markerLocation, setMarkerLocation] = useState({
    latitude: parseFloat(profile.latitude),
    longitude: parseFloat(profile.longitude),
  });

  useEffect(() => {
    handleActivateGeolocalisation();
  }, []);

  const getAutorization = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      const isServiceEnabled = (await Location.getProviderStatusAsync())
        .locationServicesEnabled;
      if (status === "granted" && isServiceEnabled) {
        setIsGpsActivated(true);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      setIsGpsActivated(false);
      return false;
    }
  };

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      if (!profile.latitude) {
        setMarkerLocation({
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
        });
      }
      setLocation(location);
    } catch (error) {
      setIsGpsActivated(false);
    }
  };

  const handleActivateGeolocalisation = async () => {
    setIsLoading(true);
    const isAutorized = await getAutorization();
    if (isAutorized) {
      await getLocation();
    }
  };

  const handleUpdate = () => {
    dispatch(
      updateProfile({
        longitude: markerLocation.longitude,
        latitude: markerLocation.latitude,
      })
    );
    navigation.goBack();
  };

  const handleMarkerDrag = (target) => {
    setMarkerLocation(target.nativeEvent.coordinate);
    map.animateCamera(
      {
        center: target.nativeEvent.coordinate,
        pitch: 0,
        heading: 0,
        altitude: 600,
        zoom: 16,
      },
      100
    );
  };

  const resetViewToLocation = () => {
    setMarkerLocation({
      longitude: location?.coords.longitude,
      latitude: location?.coords.latitude,
    });
    map.animateCamera(
      {
        center: {
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 600,
        zoom: 16,
      },
      100
    );
  };

  return (
    <View style={styles.container}>
      {isGpsActivated &&
      location?.coords?.latitude &&
      location?.coords?.longitude ? (
        <View style={styles.locationContainer}>
          <View style={styles.mapContainer}>
            <MapView
              ref={(mapView) => {
                map = mapView;
              }}
              onMapLoaded={() => setIsLoading(false)}
              onLayout={() => {
                if (Platform.OS === "ios") setIsLoading(false);
              }}
              style={styles.map}
              initialRegion={{
                latitude: markerLocation.latitude,
                longitude: markerLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
              zoomTapEnabled={false}
              onPress={(target) => handleMarkerDrag(target)}
            >
              <MapView.Marker coordinate={markerLocation}>
                <Image
                  style={{ height: 42, width: 42 }}
                  resizeMethod="scale"
                  source={HomeImage}
                />
              </MapView.Marker>
            </MapView>
          </View>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleUpdate}
          >
            <Text style={styles.locationButtonText}>
              {I18n.t("edit_location_page.user_location")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.targetButton}
            onPress={resetViewToLocation}
          >
            <Image
              style={{ width: 42, height: 42 }}
              resizeMethod="scale"
              source={TargetImage}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gpsErrorContainer}>
          <Image
            style={{ width: 150, height: 150 }}
            resizeMethod="scale"
            source={GpsImage}
          />
          <Text style={styles.errorTitle}>
            {I18n.t("edit_location_page.gps_off")}
          </Text>
          <Text style={styles.errorMessage}>
            {I18n.t("edit_location_page.error_text")}
          </Text>
          <TouchableOpacity onPress={handleActivateGeolocalisation}>
            <Text style={styles.errorButton}>
              {I18n.t("edit_location_page.try_again")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading && <Loader style={styles.loader} />}
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  const { globalReducer } = state;
  const { profile, language } = globalReducer;
  return { profile, language };
}

export default connect(mapStateToProps)(UserLocationEdit);
