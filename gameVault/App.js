import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';
import { RootStackNavigator } from './navigation/RootStackNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#051923',
    card: '#051923', 
    text: '#ffffff', 
    border: 'transparent', 
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#051923" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: '#051923' }}>
      <NavigationContainer theme={MyTheme}>
        <UserProvider>
          <RootStackNavigator />
        </UserProvider>
      </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}