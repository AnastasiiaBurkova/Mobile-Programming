import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  AsyncStorage
} from "react-native";

export default function App() {
  const [number, setNumber] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [result, setResult] = useState("");
  const [count, setCount] = useState(1);
  const [bestScore, setBestScore] = useState("");

  const randomize = () => {
    setRandom(Math.floor(Math.random() * 100) + 1);
  };

  const storeData = async count => {
    try {
      await AsyncStorage.setItem("bestScore", count.toString());
    } catch (error) {
      Alert.alert("Error saving data");
    }
  };
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("bestScore");
      if (value !== null) {
        setBestScore(value);
      }
    } catch (error) {
      Alert.alert("Error reading data");
    }
  };

  const Random = () => {
    setCount(count + 1);
    setResult("Guess a number between 1-100");
    if (parseInt(number) <= 0 || parseInt(number) > 100) {
      Alert.alert("Please enter the number between 1-100");
    }
    if (parseInt(number) > random) {
      setResult("Your guess " + number + " is too high");
    } else if (parseInt(number) < random) {
      setResult("Your guess " + number + " is too low");
    } else if (parseInt(number) == random) {
      setResult("You guessed the number in " + count + " guesses");
      try {
        if (
          count < parseInt(bestScore) ||
          bestScore == "" ||
          bestScore == null
        ) {
          storeData(count);
          readData();
        }
      } catch (error) {
        Alert.alert("Error saving data");
      }
      setCount(1);
      randomize();
    } else {
      Alert.alert("The field is empty!");
    }
  };

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChange={e => setNumber(e.nativeEvent.text)}
        keyboardType={"numeric"}
      />
      <Button onPress={Random} title="MAKE GUESS" />
      <Text>Highscore: {bestScore}</Text>
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
  }
});
