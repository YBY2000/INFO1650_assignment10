// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForecastPage from './ForecastPage';
import DailyDetailPage from './DailyDetailPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Forecast">
        <Stack.Screen name="Forecast" component={ForecastPage} />
        <Stack.Screen name="DayDetail" component={DailyDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
