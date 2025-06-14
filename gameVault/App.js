import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameDetailsScreen from './screens/GameDetailsScreen';
import StoreScreen from './screens/StoreScreen';
import SectionScreen from './screens/SectionScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Store"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#051923' },
        }}>
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
        <Stack.Screen name="SectionScreen" component={SectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
