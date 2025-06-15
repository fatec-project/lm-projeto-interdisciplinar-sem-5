import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import GameDetailsScreen from './screens/GameDetailsScreen';
import StoreScreen from './screens/StoreScreen';
import SectionScreen from './screens/SectionScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LibraryScreen from './screens/LibraryScreen';
import AccountScreen from './screens/AccountScreen';
import { UserProvider } from './context/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'StoreTab') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'LibraryTab') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'AccountTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="StoreTab" 
        component={StoreScreen}
        options={{ title: 'Loja' }}
      />
      <Tab.Screen 
        name="LibraryTab" 
        component={LibraryScreen}
        options={{ title: 'Biblioteca' }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountScreen}
        options={{ title: 'Conta' }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#051923' },
            }}
            >
            {/* Telas de autenticação */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
            
            {/* Telas principais (com abas) */}
            <Stack.Screen name="Main" component={MainTabs} />
            
            {/* Telas de navegação secundária */}
            <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
            <Stack.Screen name="SectionScreen" component={SectionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
};

export default App;