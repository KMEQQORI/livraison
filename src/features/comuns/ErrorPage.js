import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { colors } from "../../css/colors";
import { connect } from "react-redux";
import { fonts } from "../../css/fonts";
import { SET_ERROR, STOP_LOADING } from "../../actions/storesActions";
import LogoBlue512Image from "../../../assets/logo-bleu-512.png";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    elevation: 400,
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    ...fonts.bigChoice,
    paddingHorizontal: 40,
    marginVertical: 80,
    color: colors.primary,
    textAlign: "center",
  },
  errorButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.warning,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  errorButtonText: {
    ...fonts.text,
    color: colors.info,
  },
  brandImage: {
    width: 200,
    height: 200,
  },
});

const ErrorPage = (props) => {
  const { dispatch, navigation } = props;

  const handleConnect = () => {
    dispatch({ type: SET_ERROR, payload: false });
    dispatch({
      type: STOP_LOADING,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleConnect}>
      <Image
        style={styles.brandImage}
        resizeMethod="scale"
        source={LogoBlue512Image}
      />
      <Text style={styles.errorText}>
        l'application a rencontré un probléme avec votre connexion
      </Text>
      <View style={styles.errorButton}>
        <Text style={styles.errorButtonText}>se reconnecter</Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(ErrorPage);
