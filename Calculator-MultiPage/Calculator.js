import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

export default function Calculator(props) {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [counter, setCounter] = useState("");
  const [history, setHistory] = useState([]);

  const { navigate } = props.navigation;

  const IncreaceButtonClicked = () => {
    setCounter(parseInt(number1) + parseInt(number2));
    setHistory([
      ...history,
      {
        key:
          number1 +
          " + " +
          number2 +
          " = " +
          (parseInt(number1) + parseInt(number2))
      }
    ]);
  };
  const DecreaseButtonClicked = () => {
    setCounter(parseInt(number1) - parseInt(number2));
    setHistory([
      ...history,
      {
        key:
          number1 +
          " - " +
          number2 +
          " = " +
          (parseInt(number1) - parseInt(number2))
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Result: {counter}</Text>
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChange={e => setNumber1(e.nativeEvent.text)}
        keyboardType={"numeric"}
      />
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChange={e => setNumber2(e.nativeEvent.text)}
        keyboardType={"numeric"}
      />
      <View style={styles.fixToText}>
        <Button onPress={IncreaceButtonClicked} title="+" />
        <Button onPress={DecreaseButtonClicked} title="-" />
        <Button
          onPress={() => navigate("History", { history: history })}
          title="History"
        />
      </View>
    </View>
  );
}
Calculator.navigationOptions = ({ navigate }) => ({ title: "Calculator" });

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
