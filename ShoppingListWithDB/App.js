import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Header, Input, Button, ListItem } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("shopListdb.db");

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shopList, setShopList] = useState([]);

  //Opening database returns database object.
  //The object has method transaction which can be used for database operations.
  //Method has three parameters:
  //First - used to execute sqlstatement
  //Second - executed if errors happen
  //Third - executed when transaction is completed successfully
  //db.  transaction(callback, error, success)

  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql(
          "create table if not exists shopList (id integer primary key not null, product text, amount text);"
        );
      },
      null,
      updateList
    );
  }, []);

  const saveItem = () => {
    db.transaction(
      tx => {
        tx.executeSql("insert into shopList (product, amount) values (?, ?);", [
          product,
          amount
        ]);
      },
      null,
      updateList
    );
  };

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql("select * from shopList;", [], (_, { rows }) =>
        setShopList(rows._array)
      );
    });
  };

  const deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopList where id = ?;`, [id]);
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
      title={item.product}
      subtitle={item.amount}
      button
      onPress={() => deleteItem(item.id)}
      rightTitle="bought"
      bottomDivider
      chevron
    />
  );

  return (
    <View>
      <Header
        centerComponent={{
          text: "SHOPPING LIST",
          style: { color: "#fff", marginBottom: 10 }
        }}
      />
      <Input
        placeholder="Product"
        label="PRODUCT"
        onChangeText={product => setProduct(product)}
        value={product}
      />
      <Input
        placeholder="Amount"
        label="AMOUNT"
        onChangeText={amount => setAmount(amount)}
        value={amount}
      />
      <View>
        <Button
          style={{ marginTop: 10 }}
          onPress={saveItem}
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
            data={shopList}
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
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
