import React from "react";
import Places from "./Places";
import Maps from "./Maps";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MyApp = createStackNavigator({
  "My Places": { screen: Places },
  Map: { screen: Maps }
});
const AppContainer = createAppContainer(MyApp);
export default function App() {
  return <AppContainer />;
}
