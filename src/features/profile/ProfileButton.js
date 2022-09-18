import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { fonts } from "../../css/fonts";
import { colors } from "../../css/colors";

const styles = StyleSheet.create({
  header: {
    marginLeft:12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    ...fonts.bigText,
    marginLeft: 16,
  },
  simpleButton: {
    width: "100%",
    display: "flex",
    backgroundColor: colors.white,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 16,
    borderRadius: 16,

  },
});

const ProfileButton = (props) => {
  const { title, icon, action } = props;

  return (
    <TouchableOpacity style={styles.simpleButton} onPress={() => action()}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(ProfileButton);
