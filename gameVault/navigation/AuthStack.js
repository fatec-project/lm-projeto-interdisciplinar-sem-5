import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen'; 

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={AuthScreen} />
  </Stack.Navigator>
);