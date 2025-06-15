import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import StoreScreen from '../screens/StoreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Loja') iconName = focused ? 'game-controller' : 'game-controller-outline';
        if (route.name === 'Biblioteca') iconName = focused ? 'library' : 'library-outline';
        if (route.name === 'Conta') iconName = focused ? 'person' : 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6200ee',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#1e1e1e', borderTopWidth: 0 },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Loja" component={StoreScreen} />
    <Tab.Screen name="Biblioteca" component={LibraryScreen} />
    <Tab.Screen name="Conta" component={AccountScreen} />
  </Tab.Navigator>
);
