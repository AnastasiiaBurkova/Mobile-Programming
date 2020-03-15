import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList
} from "react-native";
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

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={product => setProduct(product)}
        value={product}
      />
      <TextInput
        placeholder="Amount"
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={amount => setAmount(amount)}
        value={amount}
      />
      <View style={styles.fixToText}>
        <Button onPress={saveItem} title="SAVE" />
      </View>
      <Text style={{ fontWeight: "bold", color: "blue" }}>Shopping List</Text>
      <View style={styles.fixToText}>
        <View>
          <FlatList
            contentContainerStyle={styles.contentContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listcontainer}>
                <Text style={{ fontSize: 18 }}>
                  {item.product}, {item.amount}
                </Text>
                <Text
                  style={{ fontSize: 18, color: "#0000ff" }}
                  onPress={() => deleteItem(item.id)}
                >
                  {" "}
                  bought
                </Text>
              </View>
            )}
            data={shopList}
            ItemSeparatorComponent={listSeparator}
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
