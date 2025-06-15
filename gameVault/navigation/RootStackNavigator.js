import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import AuthScreen from '../screens/AuthScreen';

import { useUser } from '../context/UserContext';

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};
