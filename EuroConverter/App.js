import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Picker,
  Alert
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: [],
      currencyValue: [],
      number: "",
      currencyName: ""
    };
  }

  getData = () => {
    fetch(
      "http://data.fixer.io/api/latest?access_key=ff5f035ca46c832f5b94d5d58df5efe4"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          currency: Object.keys(responseJson.rates),
          currencyValue: Object.values(responseJson.rates)
        });
      })
      .catch(error => {
        Alert.alert("Error:", error);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  calculate = () => {
    if (this.state.number != null || this.state.number != "") {
      for (let i = 0; i < this.state.currency.length; i++) {
        if (this.state.currencyName === this.state.currency[i]) {
          const result =
            (parseInt(this.state.number) / this.state.currencyValue[i]).toFixed(
              2
            ) + " €";
          this.setState({ result: result });
        }
      }
    } else {
      Alert.alert("Enter the number");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri:
              "https://www.netclipart.com/pp/m/150-1502356_euro-coins-currency-money-credit-euro-coin-clipart.png"
          }}
        />
        <Text> {this.state.result} </Text>
        <TextInput
          placeholder="Number"
          keyboardType={"numeric"}
          onChangeText={number => this.setState({ number })}
        />
        <Button title="Convert" onPress={this.calculate} />
        <Picker
          style={{ width: 50 }}
          selectedValue={this.state.currencyName}
          onValueChange={itemValue =>
            this.setState({ currencyName: itemValue })
          }
        >
          {this.state.currency.map((item, key) => {
            return <Picker.Item value={item} label={item} key={key} />;
          })}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
