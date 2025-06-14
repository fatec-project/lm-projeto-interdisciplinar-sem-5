import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameDetailsScreen from './screens/GameDetailsScreen';
import StoreScreen from './screens/StoreScreen';
import SectionScreen from './screens/SectionScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#051923' },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
        <Stack.Screen name="SectionScreen" component={SectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
