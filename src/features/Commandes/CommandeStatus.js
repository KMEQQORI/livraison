import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import I18n from "../../utils/i18n";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  warningText: {
    ...fonts.bigChoice,
    color: colors.warning,
    paddingLeft: 8,
  },
  errorText: {
    ...fonts.bigChoice,
    color: colors.error,
    paddingLeft: 8,
  },
  successText: {
    ...fonts.bigChoice,
    color: colors.success,
    paddingLeft: 8,
  },
  descriptionText: {
    ...fonts.text,
    color: colors.white,
  },
});

export default function CommandeStatus({ status }) {
  const renderSwitch = () => {
    switch (status) {
      case "CREATED":
        return (
          <View>
            <View style={styles.container}>
              <Entypo
                name="flickr-with-circle"
                size={24}
                color={colors.warning}
              />
              <Text style={styles.warningText}>
                {I18n.t("order.status.SENT.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.SENT.description")}
            </Text>
          </View>
        );
      case "CHEKING":
        return (
          <View>
            <View style={styles.container}>
              <Entypo
                name="flickr-with-circle"
                size={36}
                color={colors.warning}
              />
              <Text style={styles.warningText}>
                {I18n.t("order.status.SENT.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.SENT.description")}
            </Text>
          </View>
        );
      case "REFUSED":
        return (
          <View>
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="cancel"
                size={36}
                color={colors.error}
              />
              <Text style={styles.errorText}>
                {I18n.t("order.status.REFUSED.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.REFUSED.description")}
            </Text>
          </View>
        );
      case "ACCEPTED":
        return (
          <View>
            <View style={styles.container}>
              <AntDesign name="forward" size={36} color={colors.success} />
              <Text style={styles.successText}>
                {I18n.t("order.status.ACCEPTED.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.ACCEPTED.description")}
            </Text>
          </View>
        );
      case "COLLECTED":
        return (
          <View>
            <View style={styles.container}>
              <Feather name="loader" size={36} color={colors.success} />
              <Text style={styles.successText}>
                {I18n.t("order.status.COLLECTED.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.COLLECTED.description")}
            </Text>
          </View>
        );
      case "DELIVERED":
        return (
          <View>
            <View style={styles.container}>
              <AntDesign name="checkcircle" size={36} color={colors.success} />
              <Text style={styles.successText}>
                {I18n.t("order.status.DELIVERED.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.DELIVERED.description")}
            </Text>
          </View>
        );
      case "CANCELED":
        return (
          <View>
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="cancel"
                size={36}
                color={colors.error}
              />
              <Text style={styles.errorText}>
                {I18n.t("order.status.CANCELED.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.CANCELED.description")}
            </Text>
          </View>
        );

      case "FAILED":
        return (
          <View>
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="cancel"
                size={36}
                color={colors.error}
              />
              <Text style={styles.errorText}>
                {I18n.t("order.status.FAILED.header")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {I18n.t("order.status.CANCELED.description")}
            </Text>
          </View>
        );

      default:
        return <Text>"foo"</Text>;
    }
  };
  return <>{renderSwitch()}</>;
}
