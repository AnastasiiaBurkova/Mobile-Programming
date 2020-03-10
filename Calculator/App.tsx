import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native';


export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [counter, setCounter] = useState('');
  const [history, setHistory] = useState([]);

  const IncreaceButtonClicked = () => {
    setCounter(parseInt(number1) + parseInt(number2))
    setHistory([...history, {key:number1 + " + " + number2 + " = "  + (parseInt(number1) + parseInt(number2)) }]);
  }
  const DecreaseButtonClicked = () => {
    setCounter(parseInt(number1) - parseInt(number2))
    setHistory([...history, {key:number1 + " - " + number2 + " = " + (parseInt(number1) - parseInt(number2)) }]);
  } 

  return (
    <View style={styles.container}>
      <Text>Result: {counter}</Text>
      <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}} onChange={(e) => setNumber1(e.nativeEvent.text)} keyboardType={'numeric'} />
      <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}} onChange={(e) => setNumber2(e.nativeEvent.text)} keyboardType={'numeric'} />
      <View style={styles.fixToText}>
      <Button onPress={IncreaceButtonClicked} title="+"/>
      <Button onPress={DecreaseButtonClicked} title="-"/>
      </View>
      <Text>History</Text>
      <View style={styles.fixToText}>
      <View><FlatList contentContainerStyle={styles.contentContainer} data={history} renderItem={({item}) =><Text>{item.key}</ Text>}/></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentContainer: {
    justifyContent:'center',
    alignItems: 'center'
  }
});
