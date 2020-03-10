import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native';


export default function App() {
  const [purchase, setPurchase] = useState('');
  const [history, setHistory] = useState([]);

  const AddPurchase = () => {
    setHistory([...history, {key:purchase }]);
  }
  const ClearAll = () => {
    setHistory([]);
  } 

  return (
    <View style={styles.container}>
      <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}} onChange={(e) => setPurchase(e.nativeEvent.text)} />
      <View style={styles.fixToText}>
      <Button onPress={AddPurchase} title="ADD"/>
      <Button onPress={ClearAll} title="CLEAR"/>
      </View>
      <Text style={{ fontWeight:'bold',   color: 'blue'}}>Shopping List</Text>
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
