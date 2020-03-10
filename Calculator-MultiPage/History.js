import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

export default function History(props) {
  const { params } = props.navigation.state;

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <View style={styles.fixToText}>
        <View>
          <FlatList
            contentContainerStyle={styles.contentContainer}
            data={params.history}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
