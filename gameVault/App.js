import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';
import { RootStackNavigator } from './navigation/RootStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserProvider>
          <RootStackNavigator />
        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}