import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Addressdb.db");

export default function Places(props) {
  const { navigate } = props.navigation;
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([]);
  const input = React.createRef();
  const isEnabled = (address !==null && address!== '');



  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql(
          "create table if not exists addressList (id integer primary key not null, address text);"
        );
      },
      null,
      updateList
    );
  }, []);

  const saveItem = () => {
    db.transaction(
      tx => {
        tx.executeSql("insert into addressList (address) values (?);", [
          address
        ]);
      },
      null,
      updateList,
      input.current.clear()
    );
  };

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql("select * from addressList;", [], (_, { rows }) =>
        setAddressList(rows._array)
      );
    });
  };

  const deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addressList where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const keyExtractor = item => {
    return item.id.toString();
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={item.address}
      onLongPress={() => deleteItem(item.id)}
      onPress={() => navigate("Map", { address: item.address })}
      rightTitle="show on map"
      topDivider
      bottomDivider
      chevron
    />
  );

  return (
    <View>
      <Input
        placeholder="Type in address"
        label="PLACEFINDER"
        ref={input}
        onChangeText={address => setAddress(address)}
        value={address}
      />
      <View>
        <Button
          raised
          icon={{ name: "save" }}
          style={{ marginTop: 10 }}
          onPress={saveItem}
          disabled={!isEnabled}
          type="solid"
          title="SAVE"
        />
      </View>
      <View>
        <View>
          <FlatList
            style={{ marginTop: 10 }}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            data={addressList}
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
  }
});
