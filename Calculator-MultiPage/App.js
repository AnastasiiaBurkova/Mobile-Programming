import React from "react";
import Calculator from "./Calculator";
import History from "./History";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MyApp = createStackNavigator({
  Calculator: { screen: Calculator },
  History: { screen: History }
});
const AppContainer = createAppContainer(MyApp);
export default function App() {
  return <AppContainer />;
}
