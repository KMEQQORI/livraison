import React, { useContext } from "react";
import { StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { colors } from "../../css/colors";
import { API_URL } from "@env";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  adsCard: {
    width: 200,
    height: 100,
    margin: 4,
    backgroundColor: colors.white,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  adsImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: colors.backgroundGray,
  },
});

const Ads = (props) => {
  const { dispatch, ads, selectedTags, navigation } = props;

  return (
    selectedTags.length === 0 && (
      <FlatList
        data={ads}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.adsCard}
            onPress={() => handleSelectAds(item)}
          >
            <Image
              style={styles.adsImage}
              source={{
                uri: `${API_URL}/api/static/ads/${item.image}`,
              }}
            />
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(ads) => ads.id}
      />
    )
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer } = state;
  const { ads, selectedTags } = storesReducer;
  return { ads, selectedTags };
}

export default connect(mapStateToProps)(Ads);
