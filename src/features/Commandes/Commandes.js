import React, { useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { connect } from "react-redux";
import { retreiveCommandes } from "../../actions/storesActions";
import CommandeListItem from "./CommandeListItem";
import EmptyCommande from "./EmptyCommande";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flex: 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    zIndex: 0,
  },
  commanderButton: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.secondary,
    justifyContent: "center",
    paddingVertical: 16,
    elevation: 1,
  },
  commanderButtonText: {
    ...fonts.secondaryHeader,
    color: "white",
  },
});

const Commandes = (props) => {
  const { dispatch, navigation, language, commandes } = props;

  useEffect(() => {
    dispatch(retreiveCommandes());
    setInterval(() => {
      dispatch(retreiveCommandes());
    }, 5000);
  }, [language]);

  return commandes.length > 0 ? (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={commandes}
          renderItem={({ item }) => <CommandeListItem item={item} />}
          keyExtractor={(item) => item.id}
        ></FlatList>
    </SafeAreaView>
  ) : (
    <EmptyCommande />
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer, globalReducer } = state;
  const { commandes } = storesReducer;
  const { language } = globalReducer;
  return { commandes, language };
}

export default connect(mapStateToProps)(Commandes);
