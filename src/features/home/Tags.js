import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../css/colors";
import { fonts } from "../../css/fonts";
import { API_URL } from "@env";
import { connect } from "react-redux";
import { selectTag } from "../../actions/storesActions";
import { isArabe } from "../../utils/languageUtils";

const styles = StyleSheet.create({
  card: {
    width: 90,
    margin: 4,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderWidth: 1,
    borderColor: colors.info,
  },
  unSelected: {
    borderWidth: 1,
    borderColor: colors.white,
    color: colors.primary,
    textAlign: "center",
  },
  selectedText: {
    color: colors.info,
    textAlign: "center",
  },
  unSelectedText: {
    color: colors.primary,
    textAlign: "center",
  },
  tagImage: {
    padding: 24,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.backgroundGray,
  },
  SelectedTagImage: {
    padding: 24,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.backgroundGray,
  },
  tagName: {
    ...fonts.text,
    fontWeight: "700",
    color: colors.secondary,
    textAlign: "right",
  },
  tagContainer: {
    marginVertical: 8,
  },
});

const Tags = (props) => {
  const { dispatch, selectedTags, tags, isArabe, navigation } = props;

  const handleSelectTag = (item) => {
    dispatch(selectTag(item));
  };

  const isSelected = (item) => {
    return (
      selectedTags.find((selectedItem) => selectedItem.id === item.id) !==
      undefined
    );
  };

  return (
    <View style={styles.tagContainer}>
      <FlatList
        data={tags}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              isSelected(item) ? styles.selected : styles.unSelected,
            ]}
            onPress={() => handleSelectTag(item)}
          >
            <Image
              style={styles.tagImage}
              source={{
                uri: `${API_URL}/api/static/tags/${item.image}`,
              }}
            />
            <Text
              style={[
                styles.tagName,
                isSelected(item) ? styles.selectedText : styles.unSelectedText,
              ]}
            >
              {isArabe ? item.nameAr : item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

function mapStateToProps(state, ownProps) {
  const { storesReducer } = state;
  const { service, selectedTags } = storesReducer;
  return { tags: service?.tags, selectedTags, isArabe: isArabe(state) };
}

export default connect(mapStateToProps)(Tags);
