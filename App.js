// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PointsTable from "./src/components/pointsTable";
import MatchesScreen from "./src/components/matchesScreen";

const Stack = createStackNavigator();

const App = () => {
  // Use state to manage data and navigation

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PointsTable">
        <Stack.Screen name="PointsTable" component={PointsTable} />
        <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
