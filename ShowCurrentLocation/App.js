import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Alert, Button } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function App() {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert("No permission to access location");
    } else {
      let loc = await Location.getCurrentPositionAsync({});
      setRegion(loc.coords);
      setTitle("My Location");
    }
  };

  const getData = () => {
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=XXBVccYSp03WjOpc82Wm5V16W4Deix9s&location=" +
      location;
    fetch(url, { method: "GET" })
      .then(response => response.json())
      .then(responseJson => {
        const data = responseJson.results[0].locations[0];
        setRegion({
          latitude: data.latLng.lat,
          longitude: data.latLng.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        });
        setTitle(
          data.adminArea1 +
            " " +
            data.adminArea5 +
            " " +
            data.adminArea6 +
            " " +
            data.postalCode +
            " " +
            data.street
        );
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapStyle}>
        <MapView style={styles.mapCont} region={region}>
          <MapView.Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude
            }}
            title={title}
          />
        </MapView>
      </View>
      <View>
        <TextInput
          placeholder="Enter an address"
          onChangeText={location => setLocation(location)}
        />
        <Button title="SHOW" onPress={getData} />
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
  mapCont: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  mapStyle: {
    flex: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
