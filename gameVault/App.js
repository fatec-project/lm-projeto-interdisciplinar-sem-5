import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './navigation/AuthStack';
import { MainTabs } from './navigation/MainTabs';
import { UserProvider, useUser } from './context/UserContext';

const AppContent = () => {
  const { user } = useUser();

  return user ? <MainTabs /> : <AuthStack />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
