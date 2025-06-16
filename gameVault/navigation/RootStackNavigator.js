import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreScreen from '../screens/StoreScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import AuthScreen from '../screens/AuthScreen';
import AccountScreen from '../screens/AccountScreen';
import SectionScreen from '../screens/SectionScreen';
import CartScreen from '../screens/CartScreen';
import { useUser } from '../context/UserContext';

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="StoreMain" component={StoreScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
          <Stack.Screen name="Section" component={SectionScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};